import { loginUser, loginGoogle, loginGithub } from '../lib/index.js';

export const welcome = () => {
  const container = document.createElement('div');

  const signInHTML = `
<section class="mainPage">
  <img src="img/comunicacao.jpg" class="bg">
    <div class="divSignIn">
      <img src="img/logo_petchat.png" class="logoW">
         <p class="introSignIn">Bem-vindo(a) ao <strong>PetChat</strong></p>
         <label class='label' for="email">E-mail:</label>

         <div class="inputGroup">
           <i class="material-icons inputIcon">person_outline</i>
           <input type="email" class="inputSignIn" id="email" placeholder="example@youremail.com" required>
         </div>

         <label class='label' for="pass">Senha:</label>
         <div class="inputGroup">
           <i class="material-icons inputIcon">lock</i>
             <input type="password" class="inputSignIn" id="pass" placeholder="*******" required minlength="6">
         </div>

         <button class="btnSignIn active">Sign In</button>
         <button class="btnRegister">Cadastro</button>
    
         <button class="btnGoogle">
           <img class="img-google" src="img/google_logo.png"/>
             Sign in com o Google
         </button>

         <button class="btnGitHub">
         <img class="img-github" src="img/github.logo.png"/>
           Sign in com o GitHub
       </button>
    </div>
</section>
`;

  container.innerHTML = signInHTML;

  const inputEmail = container.querySelector('.inputSignIn[type="email"]');
  const inputPass = container.querySelector('.inputSignIn[type="password"]');
  const btnSignIn = container.querySelector('.btnSignIn');
  const btnRegister = container.querySelector('.btnRegister');
  const btnGoogle = container.querySelector('.btnGoogle');
  const btnGitHub = container.querySelector('.btnGitHub');

  btnSignIn.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = inputEmail.value;
    const password = inputPass.value;
    if (email && password) {
      try {
        loginUser(email, password);
        window.location.hash = '#feed';
      } catch (error) {
        const errorRegister = document.createElement('div');
        errorRegister.textContent = 'Ocorreu um erro. E-mail ou senha não correspondem com o cadastro, tente novamente.';
        container.appendChild(errorRegister);
      }
    }
  });

  btnRegister.addEventListener('click', (event) => {
    event.preventDefault();
    // Direciona para a pagina de registro
    window.location.hash = '#register';
  });

  btnGoogle.addEventListener('click', async (event) => {
    event.preventDefault();
    loginGoogle()
      // Feito o Login direciona para a area de comentários
      .then(() => {
        window.location.hash = '#feed';
      })

      .catch(() => {
        const errorWelcome = document.createElement('div');
        errorWelcome.textContent = 'Ocorreu um erro ao criar o seu cadastro, por favor tente novamente.';
        container.appendChild(errorWelcome);
      });
  });

  btnGitHub.addEventListener('click', async (event) => {
    event.preventDefault();
    loginGithub()
      // Feito o Login direciona para a area de comentários
      .then(() => {
        window.location.hash = '#feed';
      })

      .catch(() => {
        const errorWelcome = document.createElement('div');
        errorWelcome.textContent = 'Ocorreu um erro ao criar o seu cadastro, por favor tente novamente.';
        container.appendChild(errorWelcome);
      });
  });

  return container;
};
