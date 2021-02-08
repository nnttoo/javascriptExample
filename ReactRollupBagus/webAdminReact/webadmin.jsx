
class Crot extends React.Component{
    render(){
        return (
            <div>
                <div> harusnya lebih enak ini tapi gak tahu lah</div>
                <div> mantep ini coy</div>
                <div> wah beneran euy</div>
                <div> Cobain pakai babel baru</div>
            </div>
        )
    }
}

class WebAdmin extends React.Component{
    
    async testAsyn(){
        await new Promise((r,x)=>{
            setTimeout(r,1000);
        })

        console.log('ini dia');
    }

    render(){  
        this.testAsyn();
        return (
            <div> 
                <Crot/>
            </div> 
        )
    } 
}
ReactDOM.render(
    <WebAdmin/>,
    document.getElementById("app")
)
 