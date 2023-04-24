import React from 'react'
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Category = () => {
    const onClickFn = ()=>{
        console.log('cliked')
    }
    const { currentColor } = useStateContext();
    const editing = { allowDeleting: true, allowEditing: true };
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Categories" currentColor={currentColor} onClick={onClickFn}/>
        <div className="table-responsive " style={{overflowX:"auto"}}>
                                        <table className="table" >
                                    <thead>
                                        <tr>
                                            <td>NAME</td>
                                            <td>CATEGORY</td>
                                            <td>SUB CATEGORY</td>
                                            <td>IMAGE</td>
                                            <td>PRICE</td>
                                            <td>isDISCOUNTED</td>
                                            <td>NEW PRICE</td>
                                            <td>isFEATURED</td>
                                            <td>STOCK</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                            <td>NAME</td>
                                            <td>CATEGORY</td>
                                            <td>SUB CATEGORY</td>
                                            <td>IMAGE</td>
                                            <td>PRICE</td>
                                            <td>isDISCOUNTED</td>
                                            <td>NEW PRICE</td>
                                            <td>isFEATURED</td>
                                            <td>STOCK</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    </div>
      </div>
    );
}

export default Category