import { useContext } from "react";
import ProductCardContainer from "../components/ProductCardContainer";
import { GlobalContext } from "../lib/context";

interface ShopPageProps {}

const ShopPage: React.FC<ShopPageProps> = () => {
  const { state } = useContext(GlobalContext);
  return (
    <>
      <main>
        {/* <div className="debug">
          <h3>Debug:</h3>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div> */}
        <ProductCardContainer />
      </main>
      <style jsx>{`
        .debug {
          position: fixed;
          z-index: 4;
        }
      `}</style>
    </>
  );
};

export default ShopPage;
