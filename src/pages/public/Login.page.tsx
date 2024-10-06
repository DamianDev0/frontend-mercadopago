import Form from "../../components/Login.component";

export function LoginPage() {
    return (
        <div className="login-container">
            <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Form />
            </div>

        </div>

    )
}