import "./Footer.scss";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="footer">
      <p>Private Library &copy; {year}</p>
    </div>
  );
}
