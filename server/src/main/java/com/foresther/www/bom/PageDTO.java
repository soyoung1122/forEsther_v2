package com.foresther.www.bom;

import lombok.Getter;
import lombok.ToString;
import org.apache.ibatis.type.Alias;

@Getter
@ToString
//@Alias("PageDTO")
public class PageDTO {

    private int startPage;
    private int endPage;
    private boolean prev, next;

    private int total;
    private Criteria cri;

    public PageDTO(Criteria cri, int total) {

        this.cri = cri;
        this.total = total;

        //페이징의 끝(endPage) 번호 계산 => 현재 페이지에서 보이는 마지막 페이지 계산
        //10페이지씩 보인다 가정
        this.endPage = (int) (Math.ceil(cri.getPageNum() / 10.0)) * 10;
        //                       올림       현재 페이지
        //ex) 1페이지 -> 10, 10페이지 -> 10, 11페이지 -> 20

        //페이징의 시작 번호(startPage) 계산
        this.startPage = this.endPage - 9;
        //     시작페이지       끝페이지

        //total을 통한 endPage의 재계산 => 실제 데이터 수가 마지막 페이지까지 도달 할 수 없는 양일 때 다시 계산
        int realEnd = (int) (Math.ceil((total * 1.0) / cri.getAmount()));
        //실제 마지막 페이지               전체 데이터 수      amount -> 한페이지당 출력되는 데이터 수 -> 현재 10

        if (realEnd <= this.endPage) {
            this.endPage = realEnd;
            //실제 페이지가 사전에 계산한 엔드페이지 보다 작다면 마지막 페이지를 실제 페이지로 설정
        }


        //이전(prev) 계산, boolean 값
        this.prev = this.startPage > 1;
        // 이전 표시는 시작 번호가 1보다 큰 경우 ex) 13페이지 경우에 시작페이지가 11페이지

        //다음(next) 계산, boolean 값
        this.next = this.endPage < realEnd;
        // 실제페이지가 현재의 끝번호 보다 클 경우 준재
        //ex) 글이 15페이지 까지 있다고 가정할때 현재 5페이지라면 실제 페이지는 15, 현재 기준 끝번호 10보다 크므로 존재
    }

}
