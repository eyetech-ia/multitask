import React from 'react';
import {Link} from 'react-router-dom';
import PageHeader from '../components/PageHeader';

import './styles.css';

// import { Container } from './styles';

const ListEmployee: React.FC = () => {
  return (   <div id = "page-func-list" className = "container">
  <PageHeader title = " GERENCIAMENTO ">
  <form id = "search-func">
  <button className="btn-geral">
  <Link to="local" className="btn-geral" >Cadastrar Local</Link>
  </button>
  <button>Relatórios</button>
  <button>
     <Link to="quest" className="btn-geral" >Cadastrar Questionario</Link>
  </button>
  </form>
  </PageHeader>
  <main>

  <article className = "func-item">

      <header>
          <img src ="https://lh3.googleusercontent.com/ogw/ADGmqu-XcoHLlMdR-5naR_zgDyKpbojO1Laf0XbAbw3Duw=s83-c-mo"alt ="Meiryanne Martins"></img>
           <div>
              <strong>Meiryanne Martins</strong>
              <span>Desenvolvedora</span>

              <button type = "button">

                  Visualizar Histórico

              </button>


          </div>
      </header>

      <header>
          <img src ="https://instagram.fcxj12-1.fna.fbcdn.net/v/t51.2885-19/s150x150/140273140_159489682372300_6653755591526927354_n.jpg?tp=1&_nc_ht=instagram.fcxj12-1.fna.fbcdn.net&_nc_ohc=X7TJx8kPIVUAX_e7xk5&oh=d866ed23eb753501367c85eb17fb87a7&oe=6068B73C" alt = ""></img>
           <div>
              <strong>Fábio</strong>
              <span>Recursos Humanos</span>

              <button type = "button">

                  Visualizar Histórico

              </button>


          </div>
      </header>

  </article>

  </main>
</div>);
}

export default ListEmployee;
