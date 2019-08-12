import React, {PureComponent} from 'react';
export default class EsTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {data:[],headers:[],limit:5,init:1}
      }
      loadData = (val)=>{
          console.log(`LOAD | ${this.state.init}`)
        fetch(`https://reqres.in/api/users?page=${val}`).then((res)=>{
            return res.json();
          }).then((res)=>{
              console.log(res.data);
              this.setState(prevState => ({
                data: res.data,
                headers: (res.data.length && Object.keys(res.data[0]))||[]
              }));
  
          }).catch((err)=>{
            console.error(err)
          })
      }
      componentDidMount(){
        this.loadData(this.state.init)
      }

      onPrevClick = ()=>{
          if(this.state.init>1){
              this.setState(prevState=>({
                init: prevState.init-1
              }))
              this.loadData(this.state.init);
          }
          console.log(`Prev Clicked`);
      }
      onNextClick = ()=>{
        if(this.state.init<4){
            this.setState((prevState)=>({
              init: prevState.init+1
            }))
            this.loadData(this.state.init);
        }
        console.log(`Next Clicked`)
      }
    render(){
        return (
            <div className="container">

            <div className="tableDiv">
                <div className="tableRow tableHeader">
                    {this.state.headers.map((h,index)=><div key={index} className="tableCell" >{h}</div>)}
                </div>
                
                {this.state.data.map((data,index)=><div key={index} className="tableRow">
                    {this.state.headers.map((h,index)=><div key={index} className="tableCell" >{data[h]}</div>)}
                </div>)}
                
                
            </div>
            <div className="table-actions">
                <div>&nbsp;
                    {this.state.init>1 && <div className="table-action" onClick={()=>this.onPrevClick()} > Prev </div>}
                </div>
                <div>
                        &nbsp;
                    {this.state.init<4 && <div className="table-action" onClick={()=>this.onNextClick()}> Next </div>}
                </div>
            </div>
        
        
        </div>)
    }
}