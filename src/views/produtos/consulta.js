import React from "react";

import Card from "../../components/card";
import ProdutosTable from "../produtos/produtosTable";
import ProdutoService from "../../app/produtoService";
import { withRouter } from "react-router-dom";

class ConsultaProdutos extends React.Component {
  state = {
    produtos: [],
    vazio: false
  };

  constructor() {
    super();
    this.service = new ProdutoService();
  }

  componentDidMount() {
    const produtos = this.service.obterProdutos();
    if (produtos.length === 0) {
      this.setState({ vazio: true });
    }
    this.setState({ produtos: produtos });
  }

  preparaEditar = sku => {
    this.props.history.push(`/cadastro-produtos/${sku}`);
  };

  deletar = (sku) => {
    const produtos = this.service.deletar(sku);
    this.setState({ produtos: produtos })
  }

  render() {
    return (
      <Card header={<h4>Consulta de Produtos</h4>}>
          {this.state.vazio ? (
            <h5 style={{ textAlign: "center" }}>Nenhum produto cadastrado.</h5>
          ) : (
            <ProdutosTable produtos={this.state.produtos} editarAction={this.preparaEditar} deletarAction={this.deletar} />
          )}
      </Card>
    );
  }
}

export default withRouter(ConsultaProdutos);
