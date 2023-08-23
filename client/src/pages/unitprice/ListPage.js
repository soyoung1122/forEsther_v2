import Select from '../../components/form/Select';
import Table from '../../components/table/Table';

import useUnitprices from '../../hooks/useUnitprices';

const ListPage = () => {

    const { head, list } = useUnitprices();

    return (
        <div>
            <h3>unitprice list page</h3>
            <Select />
            <Table 
                thead={head}
                tbody={list}
            >
                <Table
                    thead={head}
                    tbody={list}
                />
            </Table>
        </div>
    );
}

export default ListPage;