import { IonPage } from "@ionic/react";
import { Link, useParams } from "react-router-dom";
import NewPost from "../Images/Icons/new-post.svg";
import Menu from "../components/Menu";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Collapse, Input, Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import "./Posts.css";
const { Panel } = Collapse;
import { useHistory } from "react-router-dom";      
import PostsService  from "../core/services/PostsService";
import { UserContext } from "../context/userContext";


const Posts: React.FC = () => {
    const { userId } = useParams<{ userId: string }>(); 
    const [showResponseInput, setShowResponseInput] = useState<number | null>(null); // Change to hold post ID
    const [responseContent, setResponseContent] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPostData, setNewPostData] = useState({ title: "", description: "" });
    const history = useHistory();
    const [posts, setPosts] = useState<any[]>([]);
    const { user, setUser } = useContext(UserContext);

    
    const postsService = new PostsService(); 

    const fetchPosts = async () => {
      try {
        const response = await postsService.getPosts(userId);
        // const sortedPosts = response.sort(
        //   (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        // );
        // setPosts(sortedPosts);
        setPosts(response)
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    useEffect(() => {
      fetchPosts();
    }, [userId]);
  
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
      console.log("Novo post:", newPostData);
      try {
          const response = await postsService.createPost(newPostData, userId);
          console.log("Resposta da API:", response);
          await fetchPosts();
      } catch (error) {
          console.error("Erro ao criar o post:", error);
      }
      
      setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPostData({ ...newPostData, title: e.target.value });
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPostData({ ...newPostData, description: e.target.value });
    };

    const handleShowInput = (postId: number) => {
      setShowResponseInput(postId);
    };
  
    const handleCancelResponse = () => {
      setShowResponseInput(null);
      setResponseContent("");
    };
  
    const handleResponseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setResponseContent(e.target.value);
    };
  
    const handlePostResponse = async (postId: number) => {
    
      console.log("Resposta postada:", responseContent);
      try {
        const responseDto = {
          content: responseContent,
          userId: 1,
        };
        console.log("responseDto", responseDto)
        console.log("postId", postId)
        const response = await postsService.createResponse(responseDto, postId.toString());
        console.log("Resposta criada:", response);
        await fetchPosts();
      } catch (error) {
        console.error("Erro ao postar resposta:", error);
      }
      setShowResponseInput(null);
      setResponseContent("");
    };

    const backToPatientRecord = () => {
        history.push("/pacientes");
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
              {posts?.map((post) => (
                <Card title={post?.title} key={post?.id} className="mb-4">
                  <p>{post?.description}</p>

                {post?.responses.length > 0 && (  
                    <Collapse ghost>
                      <Panel
                        header={
                          <span style={{ color: "#0443BE" }}>Respostas</span>
                        }
                        key="1"
                        className="custom-collapse-panel"

                      >
                        {post?.responses.map((response) => (
                          <div key={response.id} className="response-container">
                            <Avatar icon={<UserOutlined />} />
                            <div className="response-content">
                              <div className="response-author">{response.user.fullName}</div>
                              <div className="response-text">{response.content}</div>
                            </div>
                          </div>
                        ))}

          
                      </Panel>
                    </Collapse>)}

                  <div className="response-input">
                        {showResponseInput === post.id ? (
                          <>
                            <Input
                              value={responseContent}
                              onChange={handleResponseChange}
                              placeholder="Escreva sua resposta..."
                            />
                            <Button onClick={() => handlePostResponse(post.id)} type="primary" style={{ marginTop: "8px" }}>
                              Enviar
                            </Button>
                            <Button onClick={handleCancelResponse} style={{ marginTop: "8px" }}>Cancelar</Button>
                          </>
                        ) : (
                        <div>
                            {/* <Avatar icon={<UserOutlined />} /> */}
                            <Button type="link" onClick={() => handleShowInput(post.id)} style={{ marginTop: "8px", color: "#0443BE" }}>Responder</Button>
                        </div>
                        )}
                      </div>
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
          value={newPostData.description}
          onChange={handleContentChange}
          rows={4}
        />
      </Modal>
    </IonPage>
  );
};

export default Posts;
