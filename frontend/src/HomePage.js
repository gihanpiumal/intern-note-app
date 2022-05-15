import React, { Component } from "react";
import {
  Layout,
  Button,
  PageHeader,
  Avatar,
  Image,
  Typography,
  Table,
  Space,
  Modal,
  Card,
  Input,
  Form,
  DatePicker,
} from "antd";
import axios from "axios";

import dp from "./images/dp.jpeg";

const { Content, Footer } = Layout;
const { Title } = Typography;

let id = "";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      date: "",
      description: "",
      isModalVisible: false,
      updateCon: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handelSubmit = (e) => {
    e.preventDefault();
    console.log("button work");
    const date = this.state.date;
    const title = this.state.title;
    const description = this.state.description;
    const data = {
      date: date,
      title: title,
      description: description,
    };

    axios.post("http://localhost:8000/post/save", data).then((res) => {
      if (res.data.success) {
        this.setState({
          title: "",
          date: "",
          description: "",
        });
        this.setState.isModalVisible = false;
        window.location.reload(false);
      }
    });
  };

  onDelete = () => {
    axios.delete(`http://localhost:8000/post/delete/${id}`).then((res) => {
      alert("deleted succesfully");
      window.location.reload(false);
    });
  };

  onUpdate = (e) => {
    axios.get(`http://localhost:8000/post/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          title: res.data.post.title,
          date: res.data.post.date,
          description: res.data.post.description,
        });
        this.setState({
          updateCon: true,
        });
      }
    });
  };

  onUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("button work");
    const date = this.state.date;
    const title = this.state.title;
    const description = this.state.description;
    const data = {
      date: date,
      title: title,
      description: description,
    };

    axios.put(`http://localhost:8000/post/update/${id}`, data).then((res) => {
      if (res.data.success) {
        this.setState({
          title: "",
          date: "",
          description: "",
        });
        this.setState.updateCon = false;
        window.location.reload(false);
      }
    });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false,
    });
    this.setState({
      updateCon: false,
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
    this.setState({
      updateCon: false,
    });
  };
  onChange = (date, dateString) => {
    this.state.date = dateString;
    // console.log(date);
    // this.handelSubmit();
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  render() {
    return (
      <Layout className="layout">
        <div>
          <PageHeader
            style={{
              backgroundColor: "#3D087B",
              position: "fixed",
              width: "100%",
              zIndex: "100",
            }}
            className="site-page-header"
            title={
              <Title level={4}>
                <a style={{ color: "white" }}>Intern Note App</a>
              </Title>
            }
            extra={[
              <Avatar src={<Image src={dp} style={{ width: 32 }} />} />,
              <Button onClick={this.showModal} key="1" type="link">
                Add New
              </Button>,
              <Button onClick={this.onDelete} key="1" type="link">
                Delete
              </Button>,
              <Button onClick={this.onUpdate} key="1" type="link">
                update
              </Button>,
            ]}
          />
        </div>
        <div>
          <Content
            style={{
              padding: "0 50px",
              position: "absolute",
              backgroundColor: "#11052C",
              height: "100%",
            }}
          >
            <Modal
              title="Add New Note"
              visible={this.state.isModalVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
            >
              <div className="site-card-border-less-wrapper">
                <Card bordered={false} style={{ width: 410 }}>
                  <Form>
                    <Space direction="vertical">
                      <DatePicker
                        style={{ width: 350 }}
                        onChange={this.onChange}
                      />
                      <Input
                        placeholder="Title"
                        value={this.state.title}
                        onChange={(e) =>
                          this.setState({
                            ...this.state.title,
                            title: e.target.value,
                          })
                        }
                      />
                      <Input.TextArea
                        placeholder="Description"
                        value={this.state.description}
                        onChange={(e) =>
                          this.setState({
                            ...this.state.description,
                            description: e.target.value,
                          })
                        }
                      />
                      <Button type="primary" onClick={this.handelSubmit}>
                        SAVE
                      </Button>
                    </Space>
                  </Form>
                </Card>
              </div>
            </Modal>
            <Modal
              title="Add New Note"
              visible={this.state.updateCon}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
            >
              <div className="site-card-border-less-wrapper">
                <Card bordered={false} style={{ width: 410 }}>
                  <Form>
                    <Space direction="vertical">
                      <DatePicker
                        style={{ width: 350 }}
                        onChange={this.onChange}
                      />
                      <Input
                        placeholder="Title"
                        value={this.state.title}
                        onChange={(e) =>
                          this.setState({
                            ...this.state.title,
                            title: e.target.value,
                          })
                        }
                      />
                      <Input.TextArea
                        placeholder="Description"
                        value={this.state.description}
                        onChange={(e) =>
                          this.setState({
                            ...this.state.description,
                            description: e.target.value,
                          })
                        }
                      />
                      <Button type="primary" onClick={this.onUpdateSubmit}>
                        SAVE
                      </Button>
                    </Space>
                  </Form>
                </Card>
              </div>
            </Modal>

            <Table
              scroll={{ y: 440 }}
              rowSelection={{
                onSelect: (record) => {
                  id = record.key;
                },
              }}
              style={{
                paddingTop: "100px",
              }}
              columns={[
                {
                  title: <Title level={5}>Date</Title>,
                  dataIndex: "date",
                  key: "date",
                },
                {
                  title: <Title level={5}>Title</Title>,
                  dataIndex: "title",
                  key: "title",
                },
                {
                  title: <Title level={5}>Description</Title>,
                  dataIndex: "description",
                  key: "description",
                },
              ]}
              dataSource={this.props.items}
            />
          </Content>
        </div>
        <div>
          <Footer
            style={{
              textAlign: "center",
              position: "fixed",
              width: "100%",
              bottom: "0",
              height: "20px",
              backgroundColor: "#3D087B",
            }}
          >
            Created by Gihan##piumal ©2022
          </Footer>
        </div>
      </Layout>
    );
  }
}
