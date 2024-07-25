import React, { useState } from 'react';
import './VendingMachine.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJar } from '@fortawesome/free-solid-svg-icons'; // Substitua por faJar ou outro ícone desejado

function VendingMachine() {
  const [tipo, setTipo] = useState('Coca-cola');
  const [quantidade, setQuantidade] = useState(1);
  const [pagamento, setPagamento] = useState(0);
  const [mensagem, setMensagem] = useState('');
  const [error, setError] = useState(null);
  const [estoque, setEstoque] = useState({
    'Coca-cola': 50,
    'Fanta': 50,
    'Guaraná': 50,
    'Pepsi': 50,
    'Del Valle': 50
  });
  const [troco, setTroco] = useState(500); // Saldo inicial na máquina
  const [processando, setProcessando] = useState(false); // Estado para controlar a mensagem de processamento

  const handleCompra = () => {
    setProcessando(true); // Inicia o processamento

    // Simula o atraso no processamento
    setTimeout(() => {
      const precos = {
        'Coca-cola': 2.50,
        'Fanta': 2.25,
        'Guaraná': 2.00,
        'Pepsi': 3.00,
        'Del Valle': 2.45
      };
      const preco = precos[tipo];
      const totalCompra = preco * quantidade;

      if (pagamento < totalCompra) {
        setError('Pagamento insuficiente. Tente novamente.');
        setMensagem('');
        setProcessando(false); // Finaliza o processamento
        return;
      }

      if (quantidade < 1 || quantidade > 5) {
        setError('Quantidade inválida. Tente novamente.');
        setMensagem('');
        setProcessando(false); // Finaliza o processamento
        return;
      }

      if (estoque[tipo] < quantidade) {
        setError(`Refrigerante do tipo ${tipo} esgotado.`);
        setMensagem('');
        setProcessando(false); // Finaliza o processamento
        return;
      }

      const novoTroco = troco + totalCompra;
      const trocoDevido = pagamento - totalCompra;

      // Calcula o troco a ser devolvido
      const moedas = [1, 0.50, 0.25, 0.10, 0.05, 0.01];
      let trocoRestante = parseFloat(trocoDevido.toFixed(2)); // Garante a precisão
      let trocoDevolvido = '';

      moedas.forEach((moeda) => {
        if (trocoRestante > 0) {
          const quantidadeMoedas = Math.floor(trocoRestante / moeda);
          if (quantidadeMoedas > 0) {
            trocoDevolvido += `${quantidadeMoedas} moeda(s) de R$ ${moeda.toFixed(2)}\n`;
            trocoRestante = parseFloat((trocoRestante - quantidadeMoedas * moeda).toFixed(2));
          }
        }
      });

      setTroco(novoTroco);
      setEstoque((prevEstoque) => ({
        ...prevEstoque,
        [tipo]: prevEstoque[tipo] - quantidade,
      }));
      setError(null);

      const mensagemCompra = `
        Compra realizada com sucesso!
        Pagamento: R$ ${pagamento.toFixed(2)}
        Refrigerante: ${tipo}
        Quantidade: ${quantidade}
        Preço total: R$ ${totalCompra.toFixed(2)}
        Troco devolvido: R$ ${trocoDevido.toFixed(2)}
        ${trocoDevolvido}
        Quantidade restante de ${tipo}: ${estoque[tipo] - quantidade}
        Total de dinheiro na máquina: R$ ${novoTroco.toFixed(2)}
      `;
      setMensagem(mensagemCompra);
      setProcessando(false); // Finaliza o processamento
    }, 2000); // Simula 2 segundos de processamento
  };

  return (
    <div className="vending-machine-container">
      <h2 className="vending-machine-header">
        Pop-Plus
        <FontAwesomeIcon icon={faJar} className="vending-machine-icon" /> 
      </h2>
      <div className="vending-machine-form">
        <label>
          Insira a nota:
          <input
            type="number"
            step="0.01"
            value={pagamento}
            onChange={(e) => setPagamento(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Refrigerante:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="Coca-cola">Coca-cola</option>
            <option value="Fanta">Fanta</option>
            <option value="Guaraná">Guaraná</option>
            <option value="Pepsi">Pepsi</option>
            <option value="Del Valle">Del Valle</option>
          </select>
        </label>
        <label>
          Quantidade:
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value, 10))}
            min="1"
            max="5"
          />
        </label>
        <button onClick={handleCompra} disabled={processando}>
          Comprar
        </button>
      </div>
      <div className="vending-machine-result">
        {processando && (
          <p className="vending-machine-message">Processando sua compra, aguarde...</p>
        )}
        {mensagem && !processando && <pre className="vending-machine-message">{mensagem}</pre>}
        {error && !processando && <p className="vending-machine-error">{error}</p>}
      </div>
    </div>
  );
}

export default VendingMachine;
