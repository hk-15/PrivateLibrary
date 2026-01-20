import { useContext } from "react";
import AddBookButton from "../../components/Buttons/AddBookButton/AddBookButton";
import ManageCollectionsButton from "../../components/Buttons/ManageCollectionsButton/ManageCollectionsButton";
import ViewCatalogueButton from "../../components/Buttons/ViewCatalogueButton/ViewCatalogueButton";
import { Page } from "../Page/Page";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { UserStats } from "../../components/Stats/UserStats/UserStats";
import Stats from "../../components/Stats/Stats";
import "./Home.scss";

export default function Home() {
  const loginContext = useContext(LoginContext);

  if (!loginContext.isLoggedIn) {
    return (
      <Page>
        <h1 className="border-spaced-bottom">Private Library</h1>
        <p className="border-spaced-bottom">
          <a className="login-message-link" href="/login">
            Join Private Library
          </a>{" "}
          to catalogue your books, curate collections and share books with
          friends.
        </p>
        <Stats />
      </Page>
    );
  }
  return (
    <Page>
      <h1 className="border-spaced-bottom">Private Library</h1>
      <UserStats username={loginContext.username} />
      <Stats />
      <div className="border-spaced-bottom">
        <AddBookButton />
        <ManageCollectionsButton />
        <ViewCatalogueButton />
      </div>
    </Page>
  );
}
