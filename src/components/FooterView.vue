<template>
    <footer class="footer">
      <div class="container">
        <div class="info">
          <h4>원민영의 웹 포트폴리오 입니다.</h4>
          <p>Instagram: 
            <a href="https://www.instagram.com/fantasystar94" target="_blank" rel="noopener noreferrer">
              @fantasystar94
            </a>
          </p>
          <p>Email: 
            <a href="mailto:aniseed_3@naver.com">aniseed_3@naver.com</a>
          </p>
          <p>Phone: 
            <span>010-3124-3785</span>
          </p>
          <p>GitHub: 
            <a href="https://github.com/fantasystar94" target="_blank" rel="noopener noreferrer">
              fantasystar94
            </a>
          </p>
        </div>
        <div class="copy">
          <p>&copy; {{ new Date().getFullYear() }} fantasystar94. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterView"
  };
  </script>

<style>
.footer {
    background-color: #282c34;
    color: white;
    padding: 20px 0;
    text-align: center;
    width:100%;
}

.container {
    margin: 0 auto;
    padding: 0 20px;
}

.info {
    margin-bottom: 15px;
}

h4 {
    margin-bottom: 10px;
}

a {
    color: #61dafb;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

@media (max-width: 749px) {
    .container {
        padding: 0 10px;
    }

    h4 {
        font-size: 1.2em;
    }

    p {
        font-size: 0.9em;
    }
}
</style>