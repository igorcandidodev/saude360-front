import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../pages/Login';
import { UserAuthContext } from '../context/userAuth';
import { AuthenticationService } from '../core/services/AuthenticationService';
import ToastService from '../core/services/ToastService';

const mockHistoryPush = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await import('react-router-dom');
    return {
      ...actual,
      MemoryRouter: ({ children }) => <div>{children}</div>,
      useHistory: () => ({
        push: mockHistoryPush
      }),
      Link: ({ children, to }) => <a href={to}>{children}</a>
    };
  });

vi.mock('../core/services/ToastService', () => ({
  default: {
    showError: vi.fn(),
    showSuccess: vi.fn()
  }
}));

// Create a mock for axios
const mock = new MockAdapter(axios);

const mockAuthContextValue = {
  authInitial: { cpf: '', password: '' },
  setUserCpf: vi.fn()
};

const renderComponent = (contextOverrides = {}) => {
  const contextValue = {
    ...mockAuthContextValue,
    ...contextOverrides
  };

  return render(
    <MemoryRouter>
      <UserAuthContext.Provider value={contextValue}>
        <Login />
      </UserAuthContext.Provider>
    </MemoryRouter>
  );
};

describe('LoginPage Component', () => {
  let authService: AuthenticationService;

  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();
    mock.reset();
    
    authService = new AuthenticationService();
  });

  it('renderiza o formulário de login corretamente', () => {
    renderComponent();

    expect(screen.getByText('ENTRAR')).toBeInTheDocument();
    expect(screen.getByText('CADASTRE-SE')).toBeInTheDocument();
    expect(screen.getByText('Esqueceu sua senha?')).toBeInTheDocument();
  });

  it('exibe toast de erro quando os campos de login estão vazios', () => {
    renderComponent();

    const loginButton = screen.getByText('ENTRAR');
    fireEvent.click(loginButton);

    expect(ToastService.showError).toHaveBeenCalledWith('Preencha todos os campos');
  });

  it('login bem-sucedido para paciente redireciona para agendamentos', async () => {
    const contextValue = {
      authInitial: { 
        cpf: '12345678900', 
        password: 'ValidPassword123' 
      },
      setUserCpf: vi.fn()
    };

    // Mock successful login response
    mock.onPost(`${import.meta.env.VITE_API_URL}/api/authentication/login`).reply(200, {
      token: 'fake-token',
      cpf: '12345678900',
      roles: [{ authority: 'ROLE_PROFESSIONAL' }],
    });

    renderComponent(contextValue);

    const loginButton = screen.getByText('ENTRAR');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(ToastService.showSuccess).toHaveBeenCalledWith('Login efetuado com sucesso');
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(localStorage.getItem('cpf')).toBe('12345678900');
      const roleReceived = JSON.stringify([{ authority: 'ROLE_PROFESSIONAL' }]);
      expect(localStorage.getItem('roles')).toBe(roleReceived);
      expect(mockHistoryPush).toHaveBeenCalledWith('/home'); 
    });
  });

  it('exibe erro de login com credenciais inválidas', async () => {
    const contextValue = {
      authInitial: { 
        cpf: '12345678900', 
        password: 'WrongPassword' 
      },
      setUserCpf: vi.fn()
    };

    mock.onPost(`${import.meta.env.VITE_API_URL}/api/authentication/login`).reply(403);
    renderComponent(contextValue);

    const loginButton = screen.getByText('ENTRAR');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(ToastService.showError).toHaveBeenCalledWith('CPF ou senha inválidos');
    });
  });

  it('estado de carregamento é gerenciado corretamente', async () => {
    const contextValue = {
      authInitial: { 
        cpf: '12345678900', 
        password: 'ValidPassword123' 
      },
      setUserCpf: vi.fn()
    };

    mock.onPost(`${import.meta.env.VITE_API_URL}/api/authentication/login`).reply(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve([200, { 
          token: 'fake-token',
          roles: [{ authority: 'ROLE_PATIENT' }],
          cpf: '12345678900'
        }]), 100)
      });
    });

    renderComponent(contextValue);

    const loginButton = screen.getByText('ENTRAR');
    fireEvent.click(loginButton);

    const loadingSpinner = await screen.findByTestId('moon-loader');
    expect(loadingSpinner).toBeInTheDocument();

    await waitFor(() => {
      expect(ToastService.showSuccess).toHaveBeenCalledWith('Login efetuado com sucesso');
    });
  });

  it('redireciona para página de cadastro ao clicar em "CADASTRE-SE"', () => {
    renderComponent();
    const signupButton = screen.getByText('CADASTRE-SE');
    fireEvent.click(signupButton);
    expect(mockHistoryPush).toHaveBeenCalledWith('/cadastro-profissional'); 
  });

it('redireciona para página de recuperação de senha ao clicar em "Esqueceu sua senha?"', () => {
    renderComponent();
  
    const forgotPasswordLink = screen.getByText('Esqueceu sua senha?');
    fireEvent.click(forgotPasswordLink);
    expect(forgotPasswordLink).toHaveAttribute('href', '/esqueceu-senha');
  });
});