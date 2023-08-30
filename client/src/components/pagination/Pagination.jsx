import propTypes from 'prop-types'
import '../../styles/common/Pagination.css'

//현재페이지 값인 props 전달 (currentPage)
//페이지 수 numberOfPages
//onClick이라는 함수 전달 받기 : getPosts란 함수 전달 받았음
const Pagination = ({currentPage, numberOfPages, onClick, limit}) => {

    //현재 페이지가 몇번 째 그룹에 있는지 (ex. 5개씩 버튼이 출력 될 때, 12345, 678910 => 앞그룹이 1세트 뒷그룹이 2세트 이런식)
    const currentSet = Math.ceil(currentPage/limit);
    //그 세트의 첫번째 페이지 구하기
    const startPage = limit * (currentSet - 1) + 1;
    //마지막 세트 구하기
    const lastSet = Math.ceil(numberOfPages/limit);
    //그페이지가 속하는 세트에 몇개의 페이지가 있는지
    //const numberOfPageForSet = currentSet === lastSet ? numberOfPages % limit : limit;
    const numberOfPageForSet = currentSet === lastSet && numberOfPages % limit !== 0 ? numberOfPages % limit : limit;

    //console.log(numberOfPageForSet);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {/* 현재 세트가 1세트 이면 이전 버튼이 필요 없으므로 1이후 세트에서만 출력 */}
                {currentSet !== 1 && <li className="page-item">
                <div 
                    className="page-link cursor-pointer"
                    // 이전 세트로 돌아가도록
                    onClick={() => onClick(startPage - limit)}
                >
                    Previous
                </div>
                </li>}
                {/* 빈배열 5개만들고(props로 5넘어옴)
                                    그안에 1로 채움             인덱스 값 만큼 증가 => 1,2,3,4,5 탄생*/}  
                {/* {Array(numberOfPages).fill(1).map((value, index) => value + index) */}
                {/* 세트의 포함된 페이지 수 대로 빈배열 생성
                                           스타트 페이지로 배열을 채우고
                                                                                 1씩 증가하기 */}
                {Array(numberOfPageForSet).fill(startPage).map((value, index) => value + index)
                    .map((pageNumber) => {
                        return <li 
                                    key={pageNumber}
                                    className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                        <div 
                                            className="page-link cursor-pointer"
                                            onClick={() => {
                                                onClick(pageNumber)
                                            }}    
                                        >
                                            {pageNumber}
                                        </div>
                                </li>
                    })
                }
                {/* 현재 페이지가 마지막 세트이면 Next 버튼을 보여줄 필요가 없음 */}
                {currentSet !== lastSet && <li className="page-item">
                    <div 
                        className="page-link cursor-pointer"
                        //다음 세트로 이동
                        onClick={() => onClick(startPage + limit)}
                    >
                        Next
                    </div>
                </li>}
            </ul>
        </nav>
    );

}

Pagination.propTypes = {
    //정수로
    currentPage: propTypes.number,
    //정수이고 반드시 필요한 값임
    numberOfPages: propTypes.number.isRequired,
    //함수이고 반드시 전달
    onClick: propTypes.func.isRequired
}

Pagination.defaultProps = {
    //현재 페이지가 어디인지 디폴트 값 1
    currentPage: 1,
    //페이지 버튼 갯수 디폴트 값 5
    limit: 5
}

export default Pagination;