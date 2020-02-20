import React from "react";
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
    this.service.deletar(sku);
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h4>Consulta de Produtos</h4>
        </div>
        <div className="card-body">
          {this.state.vazio ? (
            <h5 style={{ textAlign: "center" }}>Nenhum produto cadastrado.</h5>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr style={{ color: "#000" }}>
                  <th>NOME</th>
                  <th>SKU</th>
                  <th>PREÇO</th>
                  <th>FORNECEDOR</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {this.state.produtos.map((produto, index) => {
                  return (
                    <tr
                      key={index}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "#FFF" }
                          : { backgroundColor: "#DFD9D8" }
                      }
                    >
                      <th>{produto.nome}</th>
                      <th>{produto.sku}</th>
                      <th>{produto.preco}</th>
                      <th>{produto.fornecedor}</th>
                      <th>
                        <button
                          onClick={() => this.preparaEditar(produto.sku)}
                          style={{ marginRight: +"5" }}
                          className="btn btn-primary btn-sm"
                        >
                          Editar
                        </button>
                        <button onClick={() => this.deletar(produto.sku)}className="btn btn-danger btn-sm">
                          Remover
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ConsultaProdutos);
