import { useContext } from "react";
import AddBookForm from "../../components/AddBookForm/AddBookForm";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { Page } from "../Page/Page";
import "./AddBook.scss";
import { LoginMessage } from "../../components/LoginMessage/LoginMessage";

export default function AddBook() {
  const loginContext = useContext(LoginContext);

  if (!loginContext.isLoggedIn) {
    return (
      <Page>
        <LoginMessage message="" />
      </Page>
    );
  }

  return (
    <Page>
      <h1 className="border-spaced-bottom">Shelve a book</h1>
      <AddBookForm />
    </Page>
  );
}
