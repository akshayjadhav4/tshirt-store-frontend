import React , {useState , useEffect} from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { API } from "../backend";

export default function Home() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = () =>{
        getProducts().then(data =>{
            if (data.error) {
                setError(data.error)
            }else{
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
    }, [])
  return (
    <Base title="T-shirt Store" description="Welcome to Tshirt store">
      <div className="row text-center">
        {
            products.map((product , index)=>{
                return(
                    <div key={index} className="col-4 mb-4">
                        <Card product ={product} />
                    </div>
                )
            })
        }
      </div>
    </Base>
  );
}
