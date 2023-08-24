import PageCard from '../../components/page/PageCard';
import PageHeader from '../../components/page/PageHeader';
import PageTitle from '../../components/page/PageTitle';
import Table from '../../components/table/Table';

import useUnitprices from '../../hooks/useUnitprices';

const ListPage = () => {

    const { head, list } = useUnitprices();

    return (
        <div>
            <PageCard>
                <PageHeader>
                    <PageTitle value="단가관리" />
                </PageHeader>
                <Table 
                    thead={head}
                    tbody={list}
                />
            </PageCard>
        </div>
    );
}

export default ListPage;