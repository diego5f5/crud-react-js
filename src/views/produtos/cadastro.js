import React from "react";
import ProdutoService from "../../app/produtoService";
import ErroValidacao from '../../app/produtoService';

const estadoInicial = {
  nome: "",
  sku: "",
  descricao: "",
  preco: 0,
  fornecedor: "",
  //
  sucesso: false,
  errors: [],
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
    const produto = {
      nome: this.state.nome,
      sku: this.state.sku,
      descricao: this.state.descricao,
      preco: this.state.preco,
      fornecedor: this.state.fornecedor
    };

    try{
      this.service.salvar(produto);
      this.limpaCampos();
      this.setState({sucesso:true});
    }catch(erro){
      const errors = erro.errors;
    }

    
  };

  limpaCampos = () => {
    this.setState(estadoInicial);
  };

  render() {
    return (
      <div className="card">
        <div className="card-header">Cadastro de Produto</div>
        <div className="card-body">

          {this.state.sucesso ? (
              <div class="alert alert-dismissible alert-success">
              <button type="button" class="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Sucesso!</strong> O produto foi cadastrado corretamente.
            </div>
          ) : null }

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
            <div className="col-md-1">
              <button
                className="btn btn-success"
                onClick={this.onSubmitHandler}
              >
                Salvar
              </button>
            </div>

            <div className="col-md-1">
              <button className="btn btn-primary" onClick={this.limpaCampos}>
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CadastroProduto;
