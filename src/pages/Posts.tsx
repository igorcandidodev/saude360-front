import { IonPage } from "@ionic/react";
import { Link } from "react-router-dom";
import NewPost from "../Images/Icons/new-post.svg";
import Menu from "../components/Menu";

import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Collapse, Input, Modal } from "antd";
import { useState } from "react";
import "./Posts.css";
const { Panel } = Collapse;
import { useHistory } from "react-router-dom";      

const mockPosts = [
  {
    id: 1,
    title: "Tire suas dúvidas aqui",
    content: "This is the content of the first post.",
    responses: [
      {
        id: 1,
        name: "Julia Rocha Coelho",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget.",
      },
    ],
  },
  {
    id: 2,
    title: "Atividade da sessão do dia xx/xx/xxxx",
    content: "This is the content of the second post.",
    responses: [
      {
        id: 1,
        name: "John Doe",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget.",
      },
    ],
  },
  {
    id: 3,
    title: "Atividade da sessão do dia xx/xx/xxxx",
    content: "This is the content of the second post.",
    responses: [
      {
        id: 1,
        name: "John Doe",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget.",
      },
    ],
  },
  {
    id: 4,
    title: "Atividade da sessão do dia xx/xx/xxxx",
    content: "This is the content of the second post.",
    responses: [
      {
        id: 1,
        name: "John Doe",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget.",
      },
    ],
  },
];

const Posts: React.FC = () => {
    const [showResponseInput, setShowResponseInput] = useState(false);
    const [responseContent, setResponseContent] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPostData, setNewPostData] = useState({ title: "", content: "" });
    const history = useHistory();
  
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log("Novo post:", newPostData);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPostData({ ...newPostData, title: e.target.value });
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPostData({ ...newPostData, content: e.target.value });
    };

    const handleShowInput = () => {
      setShowResponseInput(true);
    };
  
    const handleCancelResponse = () => {
      setShowResponseInput(false);
      setResponseContent("");
    };
  
    const handleResponseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setResponseContent(e.target.value);
    };
  
    const handlePostResponse = () => {
      console.log("Resposta postada:", responseContent);
      setShowResponseInput(false);
      setResponseContent("");
    };

    const backToPatientRecord = () => {
        history.push("/ficha-pacientes");
    }
  
  return (
    <IonPage className="justify-start " style={{ overflowY: "auto" }} >
      <Menu />
      <div className="flex items-center mt-5">
        <div className=" flex flex-col lg:justify-center w-full">
          <div className="flex justify-center">
            <div className="flex-col lg:w-3/4 ">
              <div className="flex justify-between">
                <div className="w-full flex items-center">
                  <LeftOutlined
                    className="w-10"
                    style={{ color: "#0443BE", fontSize: "24px" }}
                      onClick={backToPatientRecord}
                  />
                  <h2 className="text-zinc-600 text-xl font-semibold text-center mt-3 mb-3">
                    Júlia Rocha Coelho
                  </h2>
                </div>
                <Link
                  className="flex justify-center items-center bg-blue1 text-white px-4 rounded-md w-80 my-1"
                  onClick={showModal}
                >
                  <img src={NewPost} alt="Add" className="mr-2 w-6 h-6" />
                  Adicionar novo post
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4">
              {mockPosts.map((post) => (
                <Card title={post.title} key={post.id} className="mb-4">
                  <p>{post.content}</p>

                  <Collapse ghost>
                    <Panel
                      header={
                        <span style={{ color: "#0443BE" }}>Respostas</span>
                      }
                      key="1"
                      className="custom-collapse-panel"

                    >
                      {post.responses.map((response) => (
                        <Card key={response.id} className="response-card">
                          <Card.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={response.name}
                            description={response.content}
                          />
                        </Card>
                      ))}

                    <div className="response-input">
                        {showResponseInput ? (
                          <>
                            <Input
                              value={responseContent}
                              onChange={handleResponseChange}
                              placeholder="Escreva sua resposta..."
                            />
                            <Button onClick={handlePostResponse} type="primary" style={{ marginTop: "8px" }}>
                              Enviar
                            </Button>
                            <Button onClick={handleCancelResponse} style={{ marginTop: "8px" }}>Cancelar</Button>
                          </>
                        ) : (
                        <div>
                            <Avatar icon={<UserOutlined />} />
                            <Button type="link" onClick={handleShowInput} style={{ marginTop: "8px", color: "#0443BE" }}>Responder</Button>
                        </div>

                        )}
                      </div>
                    </Panel>
                  </Collapse>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Adicionar novo post"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Título"
          value={newPostData.title}
          onChange={handleTitleChange}
          style={{ marginBottom: "8px" }}
        />
        <Input.TextArea
          placeholder="Conteúdo"
          value={newPostData.content}
          onChange={handleContentChange}
          rows={4}
        />
      </Modal>
    </IonPage>
  );
};

export default Posts;
