import React from "react";

export default props => {
  return (
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
        {props.produtos.map((produto, index) => {
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
                  onClick={() => props.editarAction(produto.sku)}
                  style={{ marginRight: +"5" }}
                  className="btn btn-primary btn-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => props.deletarAction(produto.sku)}
                  className="btn btn-danger btn-sm"
                >
                  Remover
                </button>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
