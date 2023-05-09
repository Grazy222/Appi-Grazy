import React from "react";
import axios from "axios";
import styled from "styled-components";

const Full = styled.div`
  background-color: blue;
  font-family: Arial, Helvetica, sans-serif;
`;

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: orange;
  border-radius: 45px;
  text-align: center;
  border: solid 2px wheat;
`;

const Paragraph = styled.p`
  font-size: 1em;
  color: red;
`;

const ItensContainer = styled.div`
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.8em;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  margin-top: 0.5em;
`;

const API = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character"
});

export default class App extends React.Component {
  state = {
    info: []
  };
  //função que recebe uma promessa como resposta,de que alguma coisa deu certo
  pegarPersonagens = async () => {
    const resposta = await API.get();
    console.log(resposta);

    //mapear itens da API
    const itensApi = resposta.data.results.map((item) => {
      return {
        ...item //spread
      };
    });
    //Atualizando o estado com os itens da api
    this.setState({
      info: itensApi
    });
  };
  //pré-montando a função que pega a API
  componentDidMount() {
    this.pegarPersonagens();
  }

  render() {
    return (
      <Full>
        <Title>API DA GRAZY</Title>
        <ItensContainer>
          {this.state.info.map((item) => (
            <FullContainer>
              <h1>{item.name}</h1>
              <div>
                <img src={item.image} alt={item.name} />
                <h2> Species:</h2>
                <h2> {item.species} </h2>
                <Paragraph> {item.status} </Paragraph>
              </div>
            </FullContainer>
          ))}
        </ItensContainer>
      </Full>
    );
  }
}
