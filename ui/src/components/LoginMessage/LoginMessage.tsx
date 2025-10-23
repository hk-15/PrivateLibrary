type Props = {
    message: string
};

export const LoginMessage: React.FC<Props> = ({ message }) => {
    return (
        <p className="border-spaced-bottom">Please <a className="login-message-link" href="/login">log in</a> {message}</p>
    )
}