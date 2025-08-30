import { Link } from "react-router-dom";
function BeforeLigIn(){
    return<>
     <div>
      {/* Button navigation */}
      <Link to="/login">
        <button>Go to About Page</button>
      </Link>
    </div>
    </>
}
export default BeforeLigIn;