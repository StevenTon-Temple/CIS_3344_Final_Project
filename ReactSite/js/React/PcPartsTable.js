const PcPartsTable = ({ list }) => {
    
    console.log("PcPartsTable invoked");
        return (
            <div className="clickSort">
                <h1 className="textAlignCenter">Parts Table</h1>
                <table>
                    <thead>
                        <tr>
                            <th className="textAlignLeft">Name</th>
                            <th className="textAlignCenter">Image</th>
                            <th className="textAlignRight">Price</th>
                            <th className="textAlignCenter">Release Date</th>
                            <th className="textAlignLeft">Stock</th>
                            <th className="textAlignLeft">User Email</th>
                            <th className="textAlignCenter">User Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map(listObj =>
                                <tr key={listObj.processorId}>
                                    <td className="textAlignLeft">{listObj.name}</td>
                                    <td className="wideImage textAlignCenter"><img src={listObj.image} /></td>
                                    <td className="textAlignRight">{listObj.price}</td>
                                    <td className="textAlignCenter">{listObj.releasedate}</td>
                                    <td className="textAlignLeft">{listObj.stock}</td>
                                    <td className="textAlignLeft">{listObj.userEmail}</td>
                                    <td className="shadowImage textAlignCenter"><img src={listObj.userImages} /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    };

// Sample Parts from the JSON file.
/*
   "processorId": 1,
    "name": "AMD Ryzen 5 7600X",
    "image": "https://www.amd.com/system/files/2022-09/1536834-amd-ryzen-5-7000-series-PIB-angle-1260x709.png",
    "price": "299",
    "releasedate": "9/27/2022",
    "stock": "In Stock",
    "webUserId": 5,
    "userEmail": "steven@temple.edu"

 */