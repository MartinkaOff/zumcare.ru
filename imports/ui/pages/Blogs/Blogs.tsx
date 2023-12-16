import React from "react";
import { Container, Card, Col, Row, CardGroup } from "react-bootstrap";
import { useMultipleBlogs } from "../../../helpers/hooks/useMultipleBlogs";
import { useHistory } from "react-router-dom";
import { SpecialistBlog } from "../../components/SpecialistBlog/SpecialistBlog";
import { Loading } from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { UpdateBlogImg } from "../../components/UpdateAvatar/UpdateBlogImg";
import { useTranslation } from "react-i18next";

export function Blogs() {
  const user = Meteor.user();
  // @ts-ignore
  const userType = user?.profile?.userType;
  const { blogs, isBlogsLoading } = useMultipleBlogs();
  const history = useHistory();
  const { id } = useParams();
  const { t } = useTranslation();

  const handleClick = (_id: string) => {
    {
      userType === "specialist"
        ? history.push(`/blog/${_id}`)
        : history.push(`/blog/${_id}`);
    }
  };

  return !isBlogsLoading ? (
    <div>
      <Container style={{ padding: "3rem 0 5rem 0" }}>
        <Card style={{ padding: "2rem" }}>
          {userType === "specialist" ? (
            <SpecialistBlog />
          ) : (
            <h2 style={{ textAlign: "center", paddingBottom: "2rem" }}>
              {t("news")}
            </h2>
          )}
          <Row defaultactivekey="0" className="g-4" md={4}>
            {blogs.map((blog, index) => (
              <Col xs={12} md={4} key={blog._id}>
                <CardGroup>
                  <Card
                    style={{
                      width: "360px",
                      height: "510px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <UpdateBlogImg {...blog} photo={blog?.photo} />
                    <Card.Body onClick={() => handleClick(blog._id)}>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text>{blog.content}</Card.Text>
                    </Card.Body>
                  </Card>
                </CardGroup>
              </Col>
            ))}
          </Row>
        </Card>
      </Container>
    </div>
  ) : (
    <Loading />
  );
}
