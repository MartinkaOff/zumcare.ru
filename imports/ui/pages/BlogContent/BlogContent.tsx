import React from "react";
import { Card, Container, Form } from "react-bootstrap";
import { useBlog } from "../../../helpers/hooks/useBlog";
import { Loading } from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { SpecialistContent } from "../../components/SpecialistBlog/SpecailistContent";

export function BlogContent() {
  const user = Meteor.user();
  // @ts-ignore
  const userType = user?.profile?.userType;
  const { id } = useParams();
  const { blog, isBlogLoading } = useBlog(id);

  return !isBlogLoading ? (
    <Container>
      <div style={{ marginLeft: "auto", marginRight: "auto", padding: "2rem" }}>
        {userType === "specialist" ? (
          <SpecialistContent />
        ) : (
          <Card>
            <Card.Body>
              <div style={{ textAlign: "center", padding: "1rem" }}>
                <h2>{blog?.title}</h2>
                <h4>{blog?.author}</h4>
              </div>

              <p style={{ whiteSpace: "pre-wrap" }}>{blog?.content}</p>
            </Card.Body>
          </Card>
        )}
      </div>
    </Container>
  ) : (
    <Loading />
  );
}
