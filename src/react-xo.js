import React , { Component } from 'react'
export default class XO extends Component{
  constructor(props){
    super(props)
    this.state={
      unit:["O", "X"],
      counter: 0,
      board:[ 
        ["_", "_", "_"], 
        ["_", "_", "_"], 
        ["_", "_", "_"]
      ]
    }
    this.counter = this.counter.bind(this)
  }

  counter(index,NextUnit){
    let { unit, counter, board } = this.state
    board[index.row][index.cell] = NextUnit
    this.setState({ 
      ...unit,
      counter: counter += 1 ,
      lineWin:[],
      wintxt:"",
      board: board
    }, this.whoWin)
  }

  whoWin(){
    let { board } = this.state
    const check = (point) =>{
        if(point === 3){
          this.setState({
            ...this.state,
            wintxt:"X win!!"
          }, () => this.props.winner("X")) 
        }

        if(point === -3){
          this.setState({
            ...this.state,
            wintxt:"O win!!"
          }, () => this.props.winner("O"))      
        }
      }

    //Row
    var point_cul = [0,0,0]
    var point_row = [0,0,0]
    var point_X_line = [0, 0]
    board.map((row, RowIndex)=>{
      row.map((cell, culIndex)=>{
        switch (cell) {
          case "X":
            point_row[RowIndex] += 1
            point_cul[culIndex] += 1

            if(RowIndex === culIndex)
              point_X_line[0] += 1
          
            if( 
              (RowIndex === 0 && culIndex === 2) ||  
              (RowIndex === 1 && culIndex === 1) ||  
              (RowIndex === 2 && culIndex === 0)
              )
              point_X_line[1] += 1

            break;
        
          case "O":
            point_row[RowIndex] -= 1 
            point_cul[culIndex] -= 1  

            if(RowIndex === culIndex)
              point_X_line[0] -= 1
            
            if( 
              (RowIndex === 0 && culIndex === 2) ||  
              (RowIndex === 1 && culIndex === 1) ||  
              (RowIndex === 2 && culIndex === 0)
              )
              point_X_line[1] -= 1 

            break;
        }
      })
    })
     
    point_row.map((point)=> check(point_row))
    point_X_line.map((point)=>check(point))
    point_cul.map((point)=>check(point))

    console.log(point_cul,point_row,point_X_line)
  }

  render(){
    let { unit, counter, board } = this.state
    var NextUnit = unit[counter % 2]
    return (
      <div style={{display:"inline-grid"}}>
        {
          board.map((row, RowIndex)=>
            <div style={{display:"inline-flex"}} key={RowIndex}>
              {
                row.map((cell, cellIndex)=>
                  <Cell key={cellIndex} value={cell} walk={NextUnit} 
                    Next={()=>this.counter( { row:RowIndex, cell:cellIndex}, NextUnit)}/>
                )
              }
            </div>
          )
        }
        <span>{this.state.wintxt}</span>
      </div>
    )
  }
}

class Cell extends Component{
  constructor(props){
    super(props)

    this.state ={
      value: this.props.value,
      NextValue: null,
      lock: false
    }
  }

  setValue(){
    if(!this.state.lock){
      this.setState({
        ...this.state,
        lock: true,
        value: this.props.walk
      }, () => 
        this.props.Next()
      )
    }
  }  

  render(){
    var class_text = (value) => {
      var text = ""
      switch (value) {
        case "X":
          text = "button is-info"
          break;

        case "O":
          text = "button is-danger"
          break;

        default:
          text = "button is-light"
          break;
      }
      return text
    }

    return ( 
      <div style={{margin: "5px"}} >
        <a className={class_text(this.state.value)} onClick={this.setValue.bind(this)}>
          {this.state.value}
        </a>
      </div>
    )
  }
}