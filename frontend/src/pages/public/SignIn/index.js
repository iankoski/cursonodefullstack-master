import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import Logo from '../../../assets/logo.png';
import { BoxContent, BoxForm } from './styles';
import { Link, withRouter } from 'react-router-dom';
import api from '../../../services/api';
import { login } from '../../../services/auth';

class SignIn extends React.Component {

    sate = {
        email: '',
        password: '',
        error: ''
    };
    handleSignIn = async (event) => {
        /*Chamada feita para evitar que o navegador faça um POST*/
        event.preventDefault();
        const { email, password, error } = this.state;
        if (!email || !password) {
            this.setState({ error: "Informe todos os campos para acessar" })
        } else {
            try {
                /* Faz o post para o backend logar */
                const response = await api.post('accounts/login', {
                    email, password
                });
                /* Faz o login passando o token que veio da requisição */
                login(response.data.token);
                this.props.history.push("/");
            } catch {
                console.log(`Deu um erro ${Error}`);
                this.setState({ error: 'Ocorreu um erro durante o login' });
            }
        }
    }

    render() {
        return (
            <Container >
                <Row className="justify-content-md-center" >
                    <Col xs={12} md={6}>
                        <BoxContent>
                            <img src={Logo} alt='MailShrimp' />
                        </BoxContent>
                        <BoxForm>
                            <h2>Login</h2>
                            <p>Informe seus dados para autenticar: </p>
                            <Form onSubmit={this.handleSignIn} >
                                <Form.Group controlId="emailGroup">
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control type="email"
                                        placeholder="Digite seu e-mail" 
                                        onChange={e => this.setState({email: e.target.value})}/>
                                </Form.Group>
                                <Form.Group controlId="passwordGroup">
                                    <Form.Label>Senha:</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Digite sua senha" 
                                        onChange={e => this.setState({password: e.target.value})}/>
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <br />
                                    <Button block="true" variant="secondary" type="submit">
                                        Fazer Login
                                    </Button>
                                </div>

                            </Form>
                        </BoxForm>

                        <BoxContent>
                            <p>Novo na plataforma?</p>
                            <Link className="button" to="/signup">Crie sua conta</Link>
                        </BoxContent>
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default withRouter(SignIn);