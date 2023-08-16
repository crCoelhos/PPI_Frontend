import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./LoginBox.module.css";
import useLoginController from "../../controllers/loginController";

const LoginBox = () => {
  const {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
    loggedIn,
  } = useLoginController();

  const location = useLocation();
  const navigate = useNavigate();
  
  if (loggedIn) {
    if (location.state) {
      navigate(location.state.url, { state: location.state });
    } else {
      navigate("/home");
    }
  }

  return (
    <div className={styles.loginContent}>
      <div>
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div
            className="col-lg-6 col-xs-6"
            style={{ margin: "0px", padding: "0px" }}
          >
            <div className="shadow">
              <div className="card-body">
                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className={styles["text-center"]}>
                          Insira seu CPF ou EMAIL
                        </label>
                        <input
                          className={styles.inputFieldUser}
                          type="text"
                          value={username}
                          onChange={handleUsernameChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label>Senha</label>
                        <input
                          className={styles.inputFieldPassword}
                          id="userInput"
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Não consegue entrar?
                          </a>
                        </p>
                      </div>
                      <div className="d-grid">
                        <button type="submit">Entrar</button>
                      </div>
                    </form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Não possui conta?
                        <Link to="/signup" className="text-primary fw-bold">
                          Crie uma
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
