import React, { Component } from 'react'
import './Conversor.css'

export default class Conversor extends Component {

    //Criando um construtor para poder guardar os valores que serão mudados, repare que moedaA e moedaB estão definidos no App.js
    constructor(props){
        super(props);

        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0,
        }

        this.converter = this.converter.bind(this);
    }
// para usar o this dentro da função converter, temos que trazê-lo pra ca, iremos usar o bind para isso
    converter(){
        let de_para = `${this.props.moedaA}_${this.props.moedaB}`;
        let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=db6e31c514c31c5920b1 `

        fetch(url)
        .then(res=>{

            return res.json()
        })
        .then(json=>{
            let cotacao = json[de_para];
            let moedaB_valor = (parseFloat(this.state.moedaA_valor * cotacao)).toFixed(2);
            this.setState({moedaB_valor})
        })
    }
//vamos mudar o "state" de moedaA_valor, no input colocamos o event e com isso, assim que ele tiver qualquer alteração, ou seja, no momento em que digitar algo ele irá guardar esse valor em moedaA_valor
    render() {
        return (
           <div className="conversor">
              <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
              <input type="text" onChange={(event)=>{this.setState({moedaA_valor:event.target.value})}}></input> 
              <button type="button"value="converter" onClick={this.converter}>Converter</button>
              <h2>{this.state.moedaB_valor}</h2>
           </div>
        )
    }
}
