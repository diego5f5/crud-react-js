import React from "react";

import Card from "../../components/card";
import ProdutoService from "../../app/produtoService";
import { withRouter } from "react-router-dom";

const estadoInicial = {
  nome: "",
  sku: "",
  descricao: "",
  preco: 0,
  fornecedor: "",
  //
  sucesso: false,
  errors: [],
  atualizando: false
};

class CadastroProduto extends React.Component {
  state = estadoInicial;

  constructor() {
    super();
    this.service = new ProdutoService();
  }

  onChangeHandler = event => {
    const valorDoCampo = event.target.value;
    const nomeDoCampo = event.target.name;

    this.setState({
      [nomeDoCampo]: valorDoCampo
    });
  };

  onSubmitHandler = event => {
    // "event.preventDefault" Evita a submissão de formulário padrão do HTML para que possamos usar o método react.
    event.preventDefault();
    const produto = {
      nome: this.state.nome,
      sku: this.state.sku,
      descricao: this.state.descricao,
      preco: this.state.preco,
      fornecedor: this.state.fornecedor
    };

    if (this.state.sucesso) {
      this.setState({ sucesso: false });
    }

    try {
      this.service.salvar(produto);
      this.limpaCampos();
      this.setState({ sucesso: true });
    } catch (erro) {
      const errors = erro.errors;
      this.setState({ errors: errors });
    }
  };

  limpaCampos = () => {
    if (!this.state.atualizando) {
      this.setState(estadoInicial);
    }
  };

  componentDidMount() {
    const sku = this.props.match.params.sku;

    if (sku) {
      const resultado = this.service
        .obterProdutos()
        .filter(produto => produto.sku === sku);
      if (resultado.length === 1) {
        const produtoEncontrado = resultado[0];
        this.setState({ ...produtoEncontrado, atualizando: true });
      }
    }
  }

  render() {
    return (
      <Card
        header={
          this.state.atualizando ? (
            <h4>Edição de Produto</h4>
          ) : (
            <h4>Cadastro de Produto</h4>
          )
        }
      >
        <form id="frmProduto" onSubmit={this.onSubmitHandler}>
          {this.state.sucesso ? (
            <div className="alert alert-dismissible alert-success">
              {this.state.atualizando ? (
                <>
                  <strong>Sucesso! </strong>O produto foi atualizado.
                </>
              ) : (
                <>
                  <strong>Sucesso! </strong>O produto foi cadastrado
                  corretamente.
                </>
              )}
            </div>
          ) : null}

          {this.state.errors.length > 0
            ? this.state.errors.map((msg, index) => {
                return (
                  <div
                    key={index}
                    className="alert alert-dismissible alert-danger"
                  >
                    <strong>Erro! </strong>
                    {msg}
                  </div>
                );
              })
            : null}

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Nome: *</label>
                <input
                  type="text"
                  name="nome"
                  onChange={this.onChangeHandler}
                  value={this.state.nome}
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>SKU: *</label>
                <input
                  type="text"
                  name="sku"
                  disabled={this.state.atualizando}
                  onChange={this.onChangeHandler}
                  value={this.state.sku}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Descrição: </label>
                <textarea
                  name="descricao"
                  onChange={this.onChangeHandler}
                  value={this.state.descricao}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Preço: *</label>
                <input
                  type="text"
                  name="preco"
                  onChange={this.onChangeHandler}
                  value={this.state.preco}
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Fornecedor: *</label>
                <input
                  type="text"
                  name="fornecedor"
                  onChange={this.onChangeHandler}
                  value={this.state.fornecedor}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-auto mr-auto">
              <button
                title="Cadastrar este produto"
                className="btn btn-success"
                type="submit"
              >
                {this.state.atualizando ? "Atualizar" : "Salvar"}
              </button>
            </div>

            <div className="col-auto">
              <button
                disabled={this.state.atualizando}
                title="Limpar todos os campos"
                className="btn btn-primary"
                onClick={this.limpaCampos}
              >
                Limpar
              </button>
            </div>
          </div>
        </form>
      </Card>
    );
  }
}

export default withRouter(CadastroProduto);
