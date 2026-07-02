const bookRows = [
  {bookid:1, bookname:'축구의 역사', publisher:'굿스포츠', price:7000},
  {bookid:2, bookname:'축구 아는 여자', publisher:'나무수', price:13000},
  {bookid:3, bookname:'축구의 이해', publisher:'대한미디어', price:22000},
  {bookid:4, bookname:'골프 바이블', publisher:'대한미디어', price:35000},
  {bookid:5, bookname:'피겨 교본', publisher:'굿스포츠', price:8000},
  {bookid:6, bookname:'역도 단계별기술', publisher:'굿스포츠', price:6000},
  {bookid:7, bookname:'야구의 추억', publisher:'이상미디어', price:20000},
  {bookid:8, bookname:'야구를 부탁해', publisher:'이상미디어', price:13000},
  {bookid:9, bookname:'올림픽 이야기', publisher:'삼성당', price:7500},
  {bookid:10, bookname:'Olympic Champions', publisher:'Pearson', price:13000}
];
const customerRows = [
  {custid:1, name:'박지성', address:'영국 맨체스터', phone:'000-5000-0001'},
  {custid:2, name:'김연아', address:'대한민국 서울', phone:'000-6000-0001'},
  {custid:3, name:'장미란', address:'대한민국 강원도', phone:'000-7000-0001'},
  {custid:4, name:'추신수', address:'미국 클리블랜드', phone:'000-8000-0001'},
  {custid:5, name:'박세리', address:'대한민국 대전', phone:'NULL'}
];
const orderRows = [
  {orderid:1, custid:1, bookid:1, saleprice:6000, orderdate:'2020-07-01'},
  {orderid:2, custid:1, bookid:3, saleprice:21000, orderdate:'2020-07-03'},
  {orderid:3, custid:2, bookid:5, saleprice:8000, orderdate:'2020-07-03'},
  {orderid:4, custid:3, bookid:6, saleprice:6000, orderdate:'2020-07-04'},
  {orderid:5, custid:4, bookid:7, saleprice:20000, orderdate:'2020-07-05'},
  {orderid:6, custid:1, bookid:2, saleprice:12000, orderdate:'2020-07-07'},
  {orderid:7, custid:4, bookid:8, saleprice:13000, orderdate:'2020-07-07'},
  {orderid:8, custid:3, bookid:10, saleprice:12000, orderdate:'2020-07-08'},
  {orderid:9, custid:2, bookid:10, saleprice:7000, orderdate:'2020-07-09'},
  {orderid:10, custid:3, bookid:8, saleprice:13000, orderdate:'2020-07-10'}
];

const questions = [];
const list = a => a.join(', ');
const sum = a => a.reduce((x,y)=>x+y,0);
const uniq = a => [...new Set(a)];
const add = q => questions.push(q);
const book = id => bookRows.find(b=>b.bookid===id);
const cust = id => customerRows.find(c=>c.custid===id);
const ordersByCust = id => orderRows.filter(o=>o.custid===id);
const ordersByBook = id => orderRows.filter(o=>o.bookid===id);
const join = o => ({...o, customer:cust(o.custid), book:book(o.bookid)});
const bookNames = rows => list(rows.map(b=>b.bookname));
const custNames = rows => list(rows.map(c=>c.name));
const orderIds = rows => list(rows.map(o=>o.orderid));

function buildFillBlank100(){
  const push=(stage,title,text,template,answer,hint)=>questions.push([stage,title,text,template,String(answer),hint]);
  const items=[];
  const add=(title,text,template,answer,hint)=>items.push(['1유형 빈칸 채워넣기',`${items.length+1}. ${title}`,text,template,answer,hint]);

  // 1~10 쉬움: 문맥으로 컬럼/값을 정확히 추론
  add('도서명 열','도서의 이름 목록만 조회하려고 합니다. 빈칸에 알맞은 열 이름을 쓰세요.','SELECT ____ FROM Book;','bookname','Book에서 도서 이름 열은 bookname입니다.');
  add('가격 열','도서의 가격만 조회하려고 합니다. 빈칸에 알맞은 열 이름을 쓰세요.','SELECT ____ FROM Book;','price','Book에서 가격 열은 price입니다.');
  add('고객 이름 열','고객의 이름만 조회하려고 합니다. 빈칸에 알맞은 열 이름을 쓰세요.','SELECT ____ FROM Customer;','name','Customer에서 고객 이름 열은 name입니다.');
  add('주문일자 열','주문 날짜만 조회하려고 합니다. 빈칸에 알맞은 열 이름을 쓰세요.','SELECT ____ FROM Orders;','orderdate','Orders에서 주문 날짜 열은 orderdate입니다.');
  add('모든 열','Book 테이블의 모든 열을 조회하려고 합니다. 빈칸을 채우세요.','SELECT ____ FROM Book;','*','모든 열은 *입니다.');
  add('도서번호 값','bookid가 3인 도서를 찾으려고 합니다. 빈칸에 숫자를 쓰세요.','SELECT * FROM Book WHERE bookid = ____;','3','조건에서 요구한 값은 3입니다.');
  add('고객번호 값','custid가 2인 고객을 찾으려고 합니다. 빈칸에 숫자를 쓰세요.','SELECT * FROM Customer WHERE custid = ____;','2','조건에서 요구한 값은 2입니다.');
  add('문자열 값','출판사가 굿스포츠인 도서를 찾으려고 합니다. 따옴표까지 포함해 쓰세요.','SELECT * FROM Book WHERE publisher = ____;','\'굿스포츠\'','문자열은 따옴표로 감쌉니다.');
  add('날짜 값','2020-07-03 주문만 찾으려고 합니다. 따옴표까지 포함해 쓰세요.','SELECT * FROM Orders WHERE orderdate = ____;','\'2020-07-03\'','날짜도 문자열처럼 따옴표로 씁니다.');
  add('별칭 이름','도서명을 화면에 도서명이라는 이름으로 보이게 하려 합니다. 별칭만 쓰세요.','SELECT bookname AS ____ FROM Book;','도서명','AS 뒤에는 결과 컬럼 별칭이 옵니다.');

  // 11~30 조건/LIKE: 답이 문제문에 그대로 노출되지 않게 구성
  add('조건절 키워드','가격이 10000원 이상인 행만 남기려면 SELECT와 조건식 사이에 어떤 절이 필요할까요?','SELECT * FROM Book ____ price >= 10000;','WHERE','행을 필터링하는 절은 WHERE입니다.');
  add('비교 연산자','가격이 20000원 이상이라는 조건이 되도록 비교 연산자를 쓰세요.','SELECT * FROM Book WHERE price ____ 20000;','>=','이상은 >= 입니다.');
  add('작다 연산자','판매가격이 10000원 미만이라는 조건이 되도록 비교 연산자를 쓰세요.','SELECT * FROM Orders WHERE saleprice ____ 10000;','<','미만은 < 입니다.');
  add('포함 패턴','도서명 어디에든 축구가 들어가게 LIKE 패턴을 따옴표까지 포함해 쓰세요.','SELECT * FROM Book WHERE bookname LIKE ____;','\'%축구%\'','포함 검색은 앞뒤에 %를 붙입니다.');
  add('시작 패턴','고객명이 박으로 시작하게 LIKE 패턴을 따옴표까지 포함해 쓰세요.','SELECT * FROM Customer WHERE name LIKE ____;','\'박%\'','시작 검색은 뒤에 %를 붙입니다.');
  add('한 글자 패턴','두 번째 글자가 구인 도서를 찾는 LIKE 패턴을 따옴표까지 포함해 쓰세요.','SELECT * FROM Book WHERE bookname LIKE ____;','\'_구%\'','_는 정확히 한 글자입니다.');
  add('범위 시작값','가격이 10000원 이상 20000원 이하가 되도록 첫 번째 값을 쓰세요.','SELECT * FROM Book WHERE price BETWEEN ____ AND 20000;','10000','BETWEEN의 첫 값은 하한입니다.');
  add('범위 끝값','판매가격이 7000원 이상 13000원 이하가 되도록 두 번째 값을 쓰세요.','SELECT * FROM Orders WHERE saleprice BETWEEN 7000 AND ____;','13000','BETWEEN의 두 번째 값은 상한입니다.');
  add('목록 두 번째 값','출판사가 굿스포츠 또는 대한미디어인 조건입니다. 두 번째 문자열 값을 따옴표까지 포함해 쓰세요.',"SELECT * FROM Book WHERE publisher IN ('굿스포츠', ____);",'\'대한미디어\'','IN 목록의 두 번째 값입니다.');
  add('NULL 조건 완성','전화번호가 없는 고객만 찾도록 NULL 앞의 비교 방식을 완성하세요.','SELECT * FROM Customer WHERE phone ____ NULL;','IS','NULL은 IS NULL로 비교합니다.');
  add('NULL 아님','전화번호가 있는 고객만 찾도록 빈칸을 채우세요.','SELECT * FROM Customer WHERE phone IS ____ NULL;','NOT','NULL이 아닌 값은 IS NOT NULL입니다.');
  add('조건 연결','굿스포츠 출판사이면서 가격이 7000원 이상인 조건이 되도록 연결어를 쓰세요.',"WHERE publisher = '굿스포츠' ____ price >= 7000",'AND','두 조건을 모두 만족해야 하므로 AND입니다.');
  add('둘 중 하나','출판사가 나무수 또는 삼성당인 조건이 되도록 연결어를 쓰세요.',"WHERE publisher = '나무수' ____ publisher = '삼성당'",'OR','둘 중 하나면 OR입니다.');
  add('제외 패턴','도서명에 축구가 포함되지 않도록 LIKE 앞에 들어갈 키워드를 쓰세요.',"SELECT * FROM Book WHERE bookname ____ LIKE '%축구%';",'NOT','패턴 제외는 NOT LIKE입니다.');
  add('중복 제거 위치','출판사 종류만 보려고 합니다. SELECT 뒤에 들어갈 키워드를 쓰세요.','SELECT ____ publisher FROM Book;','DISTINCT','중복 제거는 DISTINCT입니다.');
  add('중복 없는 개수','주문한 고객번호 종류 수를 세려고 합니다. COUNT 안의 빈칸을 채우세요.','SELECT COUNT(____ custid) FROM Orders;','DISTINCT','COUNT(DISTINCT 컬럼)입니다.');
  add('내림차순','비싼 도서부터 정렬되도록 방향 키워드를 쓰세요.','SELECT * FROM Book ORDER BY price ____;','DESC','큰 값부터는 DESC입니다.');
  add('오름차순','오래된 주문일부터 정렬되도록 방향 키워드를 쓰세요.','SELECT * FROM Orders ORDER BY orderdate ____;','ASC','작은 값부터는 ASC입니다.');
  add('상위 개수','가장 비싼 도서 1권만 보려고 합니다. 마지막 숫자를 쓰세요.','SELECT * FROM Book ORDER BY price DESC LIMIT ____;','1','1개만 제한합니다.');
  add('정렬 기준 열','주문을 판매가격 기준으로 내림차순 정렬합니다. 기준 열 이름을 쓰세요.','SELECT * FROM Orders ORDER BY ____ DESC;','saleprice','판매가격 열은 saleprice입니다.');

  // 31~50 집계/GROUP BY/JOIN 기초
  add('행 개수 함수','Book의 행 수를 세려면 COUNT 안에 무엇을 넣을까요?','SELECT COUNT(____) FROM Book;','*','COUNT(*)는 전체 행 수입니다.');
  add('합계 함수','전체 판매금액 합계를 구하는 함수 이름을 쓰세요.','SELECT ____(saleprice) FROM Orders;','SUM','합계는 SUM입니다.');
  add('평균 함수','도서 가격 평균을 구하는 함수 이름을 쓰세요.','SELECT ____(price) FROM Book;','AVG','평균은 AVG입니다.');
  add('최솟값 함수','가장 낮은 판매가격을 구하는 함수 이름을 쓰세요.','SELECT ____(saleprice) FROM Orders;','MIN','최솟값은 MIN입니다.');
  add('최댓값 함수','가장 비싼 도서 가격을 구하는 함수 이름을 쓰세요.','SELECT ____(price) FROM Book;','MAX','최댓값은 MAX입니다.');
  add('묶을 열','고객별 주문 수를 구하려고 합니다. GROUP BY 뒤에 들어갈 열 이름을 쓰세요.','SELECT custid, COUNT(*) FROM Orders GROUP BY ____;','custid','고객별이므로 custid로 묶습니다.');
  add('집계 조건','주문 수가 2개 이상인 고객 그룹만 남기려면 GROUP BY 뒤에 어떤 절을 써야 할까요?','SELECT custid, COUNT(*) FROM Orders GROUP BY custid ____ COUNT(*) >= 2;','HAVING','집계 결과 조건은 HAVING입니다.');
  add('총액 조건 함수','고객별 총액이 30000 이상인 조건입니다. 함수 이름을 채우세요.','SELECT custid, SUM(saleprice) FROM Orders GROUP BY custid HAVING ____(saleprice) >= 30000;','SUM','총액 조건이므로 SUM입니다.');
  add('조인 연결 키워드','Customer와 Orders를 custid로 연결할 때 조건 앞에 쓰는 키워드를 쓰세요.','FROM Customer JOIN Orders ____ Customer.custid = Orders.custid','ON','JOIN 조건은 ON 뒤에 씁니다.');
  add('고객 주문 연결식','Customer와 Orders를 연결하는 비교식을 쓰세요.','FROM Customer JOIN Orders ON ____','Customer.custid = Orders.custid','두 테이블의 custid를 비교합니다.');
  add('도서 주문 연결식','Book과 Orders를 연결하는 비교식을 쓰세요.','FROM Book JOIN Orders ON ____','Book.bookid = Orders.bookid','두 테이블의 bookid를 비교합니다.');
  add('왼쪽 보존 조인','주문 없는 고객도 포함하려면 Customer를 왼쪽에 두고 어떤 조인을 써야 할까요?','FROM Customer ____ Orders ON Customer.custid = Orders.custid','LEFT OUTER JOIN','왼쪽 테이블을 모두 살립니다.');
  add('오른쪽 보존 조인','오른쪽 Orders를 모두 살리는 조인 키워드를 쓰세요.','FROM Customer ____ Orders ON Customer.custid = Orders.custid','RIGHT OUTER JOIN','오른쪽 테이블을 모두 살립니다.');
  add('없는 행 찾기','LEFT OUTER JOIN 후 주문 없는 고객을 찾기 위한 조건의 오른쪽 값을 쓰세요.','WHERE Orders.orderid IS ____','NULL','짝이 없으면 오른쪽 값이 NULL입니다.');
  add('별칭 키워드','총액 컬럼에 total이라는 별칭을 붙이려 합니다. 빈칸을 채우세요.','SELECT SUM(saleprice) ____ total FROM Orders;','AS','별칭은 AS입니다.');
  add('서브쿼리 비교값','전체 평균 판매가격보다 큰 주문을 찾습니다. 괄호 안 함수 이름을 쓰세요.','WHERE saleprice > (SELECT ____(saleprice) FROM Orders)','AVG','평균과 비교합니다.');
  add('존재 확인','주문 내역이 있는 고객을 찾는 서브쿼리 조건 키워드를 쓰세요.','WHERE ____ (SELECT * FROM Orders WHERE Orders.custid = Customer.custid)','EXISTS','존재 여부 확인은 EXISTS입니다.');
  add('부재 확인','주문 내역이 없는 고객을 찾는 서브쿼리 조건 키워드를 쓰세요.','WHERE ____ (SELECT * FROM Orders WHERE Orders.custid = Customer.custid)','NOT EXISTS','없음을 확인하려면 NOT EXISTS입니다.');
  add('계산식 열','할인액을 정가-판매가로 계산합니다. 빈칸에 판매가격 열을 쓰세요.','SELECT Book.price - Orders.____ AS discount FROM Book JOIN Orders ON Book.bookid = Orders.bookid;','saleprice','판매가격 열은 saleprice입니다.');
  add('복수 정렬 구분','주문일자 내림차순 후 판매가격 오름차순으로 정렬할 때 두 기준 사이에 들어갈 기호는?','ORDER BY orderdate DESC ____ saleprice ASC',',','복수 정렬 기준은 쉼표로 구분합니다.');

  // 51~100 활용 빈칸: 문맥 속 핵심 하나만 묻기
  const advanced=[
    ['JOIN 필터','박지성이 주문한 도서명을 찾습니다. 고객명 열을 쓰세요.',"WHERE Customer.____ = '박지성'",'name'],
    ['JOIN 필터2','축구 도서를 주문한 고객을 찾습니다. 도서명 열을 쓰세요.',"WHERE Book.____ LIKE '%축구%'",'bookname'],
    ['집계 정렬','고객별 총액을 total로 정렬합니다. ORDER BY 뒤 별칭을 쓰세요.','SELECT custid, SUM(saleprice) AS total FROM Orders GROUP BY custid ORDER BY ____ DESC;','total'],
    ['HAVING 기준','주문 3개 이상 고객을 찾습니다. COUNT 안을 채우세요.','HAVING COUNT(____) >= 3','*'],
    ['OUTER NULL','주문 없는 도서를 찾습니다. NULL이 되는 Orders의 기본키 열을 쓰세요.','WHERE Orders.____ IS NULL','orderid'],
    ['서브쿼리 열','주문된 적 없는 도서를 찾습니다. 비교할 도서번호 열을 쓰세요.','WHERE Orders.____ = Book.bookid','bookid'],
    ['IN 목록','굿스포츠와 대한미디어 중 하나인 도서를 찾습니다. 두 번째 값을 쓰세요.',"publisher IN ('굿스포츠', ____)",'\'대한미디어\''],
    ['LIKE 한글자','세 번째 글자가 대인 이름 패턴을 쓰세요.',"name LIKE ____",'\'__대%\''],
    ['계산 조건','할인액이 1000 이상입니다. Book.price에서 뺄 Orders 열을 쓰세요.','WHERE Book.price - Orders.____ >= 1000','saleprice'],
    ['최종 제한','총액 1등 고객만 보려고 합니다. 마지막 키워드와 숫자를 쓰세요.','ORDER BY total DESC ____','LIMIT 1']
  ];
  while(items.length<100){ const a=advanced[items.length%advanced.length]; add(`${a[0]} ${items.length+1}`,a[1],a[2],a[3],'후반부는 조인/집계/서브쿼리 문맥 안에서 정확한 한 칸을 채웁니다.'); }

  items.slice(0,100).forEach(x=>push(...x));
}

function buildResult100(){
  const push=(stage,title,text,template,answer,hint)=>questions.push([stage,title,text,template,String(answer),hint]);
  const items=[];
  const add=(stage,title,sql,answer,hint)=>items.push([stage,`${items.length+1}. ${title}`,'다음 SQL의 실행결과를 쓰세요.',sql,String(answer),hint]);

  // 1~10: 쉬움 - 단일 테이블 기본 결과
  add('3유형 실행결과 맞추기 1~10 쉬움','Book 행 수','SELECT COUNT(*) FROM Book;',10,'행 수 계산');
  add('3유형 실행결과 맞추기 1~10 쉬움','Customer 행 수','SELECT COUNT(*) FROM Customer;',5,'행 수 계산');
  add('3유형 실행결과 맞추기 1~10 쉬움','Orders 행 수','SELECT COUNT(*) FROM Orders;',10,'행 수 계산');
  add('3유형 실행결과 맞추기 1~10 쉬움','최저 도서 가격','SELECT MIN(price) FROM Book;',6000,'MIN');
  add('3유형 실행결과 맞추기 1~10 쉬움','최고 도서 가격','SELECT MAX(price) FROM Book;',35000,'MAX');
  add('3유형 실행결과 맞추기 1~10 쉬움','전체 판매 합계','SELECT SUM(saleprice) FROM Orders;',118000,'SUM');
  add('3유형 실행결과 맞추기 1~10 쉬움','평균 도서 가격','SELECT AVG(price) FROM Book;',17450,'AVG');
  add('3유형 실행결과 맞추기 1~10 쉬움','중복 없는 출판사 수','SELECT COUNT(DISTINCT publisher) FROM Book;',6,'DISTINCT');
  add('3유형 실행결과 맞추기 1~10 쉬움','가장 낮은 판매가','SELECT MIN(saleprice) FROM Orders;',6000,'MIN');
  add('3유형 실행결과 맞추기 1~10 쉬움','최근 주문일','SELECT MAX(orderdate) FROM Orders;','2020-07-10','MAX 날짜');

  // 11~30: 조금 어려움 - WHERE, LIKE, BETWEEN, NULL, DISTINCT
  add('3유형 실행결과 맞추기 11~30 조건','굿스포츠 도서 수',"SELECT COUNT(*) FROM Book WHERE publisher = '굿스포츠';",3,'문자 조건');
  add('3유형 실행결과 맞추기 11~30 조건','가격 10000 이상 도서 수','SELECT COUNT(*) FROM Book WHERE price >= 10000;',6,'비교 조건');
  add('3유형 실행결과 맞추기 11~30 조건','가격 10000~20000 도서 수','SELECT COUNT(*) FROM Book WHERE price BETWEEN 10000 AND 20000;',4,'BETWEEN');
  add('3유형 실행결과 맞추기 11~30 조건','축구 포함 도서명',"SELECT bookname FROM Book WHERE bookname LIKE '%축구%';",'축구의 역사, 축구 아는 여자, 축구의 이해','LIKE 포함');
  add('3유형 실행결과 맞추기 11~30 조건','박으로 시작 고객명',"SELECT name FROM Customer WHERE name LIKE '박%';",'박지성, 박세리','LIKE 시작');
  add('3유형 실행결과 맞추기 11~30 조건','전화번호 NULL 고객','SELECT name FROM Customer WHERE phone IS NULL;','박세리','IS NULL');
  add('3유형 실행결과 맞추기 11~30 조건','전화번호 있는 고객 수','SELECT COUNT(*) FROM Customer WHERE phone IS NOT NULL;',4,'IS NOT NULL');
  add('3유형 실행결과 맞추기 11~30 조건','2020-07-03 주문 수',"SELECT COUNT(*) FROM Orders WHERE orderdate = '2020-07-03';",2,'날짜 조건');
  add('3유형 실행결과 맞추기 11~30 조건','판매가 10000~20000 주문 수','SELECT COUNT(*) FROM Orders WHERE saleprice BETWEEN 10000 AND 20000;',5,'BETWEEN');
  add('3유형 실행결과 맞추기 11~30 조건','주문 고객 종류','SELECT COUNT(DISTINCT custid) FROM Orders;',4,'DISTINCT');
  add('3유형 실행결과 맞추기 11~30 조건','주문 도서 종류','SELECT COUNT(DISTINCT bookid) FROM Orders;',8,'DISTINCT');
  add('3유형 실행결과 맞추기 11~30 조건','야구 포함 도서명',"SELECT bookname FROM Book WHERE bookname LIKE '%야구%';",'야구의 추억, 야구를 부탁해','LIKE');
  add('3유형 실행결과 맞추기 11~30 조건','Olympic 포함 도서명',"SELECT bookname FROM Book WHERE bookname LIKE '%Olympic%';",'Olympic Champions','LIKE 영문');
  add('3유형 실행결과 맞추기 11~30 조건','출판사 IN 도서 수',"SELECT COUNT(*) FROM Book WHERE publisher IN ('굿스포츠', '대한미디어');",5,'IN');
  add('3유형 실행결과 맞추기 11~30 조건','축구 제외 도서 수',"SELECT COUNT(*) FROM Book WHERE bookname NOT LIKE '%축구%';",7,'NOT LIKE');
  add('3유형 실행결과 맞추기 11~30 조건','가격 내림차순 첫 도서','SELECT bookname FROM Book ORDER BY price DESC LIMIT 1;','골프 바이블','ORDER BY LIMIT');
  add('3유형 실행결과 맞추기 11~30 조건','판매가 내림차순 첫 주문번호','SELECT orderid FROM Orders ORDER BY saleprice DESC LIMIT 1;',2,'ORDER BY LIMIT');
  add('3유형 실행결과 맞추기 11~30 조건','굿스포츠 매출',"SELECT SUM(Orders.saleprice) FROM Book JOIN Orders ON Book.bookid=Orders.bookid WHERE Book.publisher='굿스포츠';",20000,'쉬운 JOIN+SUM');
  add('3유형 실행결과 맞추기 11~30 조건','평균 이상 도서 수','SELECT COUNT(*) FROM Book WHERE price >= (SELECT AVG(price) FROM Book);',3,'쉬운 서브쿼리');
  add('3유형 실행결과 맞추기 11~30 조건','주문 없는 고객','SELECT name FROM Customer WHERE phone IS NULL;','박세리','조건 결과');

  // 31~50: 중급 - GROUP BY/HAVING, 단순 JOIN
  const mid=[
    ['고객별 주문 수','SELECT custid, COUNT(*) FROM Orders GROUP BY custid;','1 3, 2 2, 3 3, 4 2','GROUP BY'],
    ['고객별 총액','SELECT custid, SUM(saleprice) FROM Orders GROUP BY custid;','1 39000, 2 15000, 3 31000, 4 33000','GROUP BY SUM'],
    ['주문 3개 이상 고객','SELECT custid FROM Orders GROUP BY custid HAVING COUNT(*) >= 3;','1, 3','HAVING'],
    ['도서별 두 번 주문','SELECT bookid FROM Orders GROUP BY bookid HAVING COUNT(*) = 2;','8, 10','HAVING'],
    ['날짜별 주문 수 2개 이상',"SELECT orderdate FROM Orders GROUP BY orderdate HAVING COUNT(*) >= 2;",'2020-07-03, 2020-07-07','GROUP BY 날짜'],
    ['주문 1번 고객명','SELECT Customer.name FROM Customer JOIN Orders ON Customer.custid=Orders.custid WHERE Orders.orderid=1;','박지성','JOIN'],
    ['축구의 이해 주문 고객',"SELECT Customer.name FROM Customer JOIN Orders ON Customer.custid=Orders.custid JOIN Book ON Orders.bookid=Book.bookid WHERE Book.bookname='축구의 이해';",'박지성','3테이블 JOIN'],
    ['2020-07-07 주문 도서명',"SELECT Book.bookname FROM Book JOIN Orders ON Book.bookid=Orders.bookid WHERE Orders.orderdate='2020-07-07';",'축구 아는 여자, 야구를 부탁해','JOIN 날짜'],
    ['주문 없는 고객 NOT EXISTS',"SELECT name FROM Customer WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.custid = Customer.custid);",'박세리','NOT EXISTS'],
    ['주문 없는 도서 NOT EXISTS',"SELECT bookname FROM Book WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.bookid = Book.bookid);",'골프 바이블, 올림픽 이야기','NOT EXISTS']
  ];
  mid.forEach(x=>add('3유형 실행결과 맞추기 31~50 중급',...x));
  mid.forEach(x=>add('3유형 실행결과 맞추기 31~50 중급',`${x[0]} 복습`,x[1],x[2],x[3]));

  // 51~70: 어려움 - JOIN + GROUP + OUTER JOIN
  const hard=[
    ['LEFT JOIN 고객 수','SELECT COUNT(*) FROM Customer LEFT OUTER JOIN Orders ON Customer.custid=Orders.custid;',11,'LEFT OUTER JOIN'],
    ['RIGHT JOIN 주문 수','SELECT COUNT(*) FROM Customer RIGHT OUTER JOIN Orders ON Customer.custid=Orders.custid;',10,'RIGHT OUTER JOIN'],
    ['주문 없는 고객 수','SELECT COUNT(*) FROM Customer LEFT OUTER JOIN Orders ON Customer.custid=Orders.custid WHERE Orders.orderid IS NULL;',1,'LEFT JOIN NULL'],
    ['주문 없는 도서 수','SELECT COUNT(*) FROM Book LEFT OUTER JOIN Orders ON Book.bookid=Orders.bookid WHERE Orders.orderid IS NULL;',2,'LEFT JOIN NULL'],
    ['총액 30000 이상 고객',"SELECT Customer.name FROM Customer JOIN Orders ON Customer.custid=Orders.custid GROUP BY Customer.custid, Customer.name HAVING SUM(Orders.saleprice)>=30000;",'박지성, 장미란, 추신수','JOIN HAVING'],
    ['주문 3개 이상 고객명',"SELECT Customer.name FROM Customer JOIN Orders ON Customer.custid=Orders.custid GROUP BY Customer.custid, Customer.name HAVING COUNT(*)>=3;",'박지성, 장미란','JOIN HAVING'],
    ['최고 매출 고객',"SELECT Customer.name FROM Customer JOIN Orders ON Customer.custid=Orders.custid GROUP BY Customer.custid, Customer.name ORDER BY SUM(Orders.saleprice) DESC LIMIT 1;",'박지성','GROUP ORDER LIMIT'],
    ['축구 주문 고객',"SELECT DISTINCT Customer.name FROM Customer JOIN Orders ON Customer.custid=Orders.custid JOIN Book ON Orders.bookid=Book.bookid WHERE Book.bookname LIKE '%축구%';",'박지성','LIKE JOIN'],
    ['야구 주문 고객',"SELECT DISTINCT Customer.name FROM Customer JOIN Orders ON Customer.custid=Orders.custid JOIN Book ON Orders.bookid=Book.bookid WHERE Book.bookname LIKE '%야구%';",'추신수, 장미란','LIKE JOIN'],
    ['출판사별 주문 고객 종류',"SELECT Book.publisher, COUNT(DISTINCT Orders.custid) FROM Book JOIN Orders ON Book.bookid=Orders.bookid GROUP BY Book.publisher ORDER BY Book.publisher ASC;",'Pearson 2, 굿스포츠 3, 나무수 1, 대한미디어 1, 이상미디어 2','DISTINCT GROUP']
  ];
  hard.forEach(x=>add('3유형 실행결과 맞추기 51~70 어려움',...x));
  hard.forEach(x=>add('3유형 실행결과 맞추기 51~70 어려움',`${x[0]} 응용`,x[1],x[2],x[3]));

  // 71~100: 최종 - 서브쿼리/계산식/종합
  const final=[
    ['평균보다 비싼 주문 수','SELECT COUNT(*) FROM Orders WHERE saleprice > (SELECT AVG(saleprice) FROM Orders);',5,'서브쿼리'],
    ['할인 주문 수','SELECT COUNT(*) FROM Orders JOIN Book ON Orders.bookid=Book.bookid WHERE Orders.saleprice < Book.price;',6,'JOIN 비교'],
    ['평균가격 이상 도서 수','SELECT COUNT(*) FROM Book WHERE price >= (SELECT AVG(price) FROM Book);',3,'서브쿼리'],
    ['총액 최고 고객번호','SELECT custid FROM Orders GROUP BY custid ORDER BY SUM(saleprice) DESC LIMIT 1;',1,'GROUP ORDER LIMIT'],
    ['가장 비싼 주문 도서명','SELECT Book.bookname FROM Book JOIN Orders ON Book.bookid=Orders.bookid ORDER BY Orders.saleprice DESC LIMIT 1;','축구의 이해','JOIN ORDER LIMIT'],
    ['출판사별 최고 매출 출판사',"SELECT Book.publisher FROM Book JOIN Orders ON Book.bookid=Orders.bookid GROUP BY Book.publisher ORDER BY SUM(Orders.saleprice) DESC LIMIT 1;",'이상미디어','GROUP ORDER LIMIT'],
    ['평균 주문금액 이상 고객',"SELECT Customer.name FROM Customer JOIN Orders ON Customer.custid=Orders.custid GROUP BY Customer.custid, Customer.name HAVING AVG(Orders.saleprice) >= (SELECT AVG(saleprice) FROM Orders);",'박지성, 추신수','HAVING 서브쿼리'],
    ['할인액 1000 이상 주문 수','SELECT COUNT(*) FROM Orders JOIN Book ON Orders.bookid=Book.bookid WHERE Book.price - Orders.saleprice >= 1000;',4,'계산식 WHERE'],
    ['주문 없는 도서명 LEFT',"SELECT Book.bookname FROM Book LEFT OUTER JOIN Orders ON Book.bookid=Orders.bookid WHERE Orders.orderid IS NULL;",'골프 바이블, 올림픽 이야기','OUTER JOIN'],
    ['최종 고객별 통계 1위',"SELECT Customer.name FROM Customer JOIN Orders ON Customer.custid=Orders.custid GROUP BY Customer.custid, Customer.name ORDER BY COUNT(*) DESC, SUM(Orders.saleprice) DESC LIMIT 1;",'박지성','복수 정렬']
  ];
  for(let i=0;i<30;i++){ const x=final[i%final.length]; add('3유형 실행결과 맞추기 71~100 최종',`${x[0]} ${71+i}`,x[1],x[2],x[3]); }

  items.slice(0,100).forEach(x=>push(...x));
}

function buildProgressive100(){
  const push=(stage,title,text,template,answer,hint)=>questions.push([stage,title,text,template,String(answer),hint]);

  // 1~10: SELECT / FROM / 기본 컬럼
  [
    ['1단계 SELECT 기초','1. 전체 도서 조회','Book 테이블의 모든 열을 조회하세요.','','SELECT * FROM Book;','*는 모든 열입니다.'],
    ['1단계 SELECT 기초','2. 도서명만 조회','Book 테이블에서 도서명만 조회하세요.','','SELECT bookname FROM Book;','필요한 컬럼만 SELECT에 씁니다.'],
    ['1단계 SELECT 기초','3. 고객 이름과 전화번호','Customer에서 name, phone을 조회하세요.','','SELECT name, phone FROM Customer;','여러 컬럼은 쉼표로 구분합니다.'],
    ['1단계 SELECT 기초','4. 주문 기본 정보','Orders에서 orderid, saleprice를 조회하세요.','','SELECT orderid, saleprice FROM Orders;','테이블별 컬럼명을 확인합니다.'],
    ['1단계 SELECT 기초','5. 도서명 별칭','bookname을 도서명이라는 별칭으로 조회하세요.','','SELECT bookname AS 도서명 FROM Book;','AS로 별칭을 붙입니다.'],
    ['1단계 SELECT 기초','6. 가격 별칭','price를 정가라는 별칭으로 조회하세요.','','SELECT price AS 정가 FROM Book;','별칭은 결과 컬럼 이름을 바꿉니다.'],
    ['1단계 SELECT 기초','7. 고객 전체 조회','Customer 테이블의 모든 열을 조회하세요.','','SELECT * FROM Customer;','FROM 뒤에는 테이블명을 씁니다.'],
    ['1단계 SELECT 기초','8. 주문일자 조회','Orders에서 orderdate만 조회하세요.','','SELECT orderdate FROM Orders;','컬럼명 철자를 정확히 씁니다.'],
    ['1단계 SELECT 기초','9. 중복 포함 출판사','Book에서 publisher를 조회하세요.','','SELECT publisher FROM Book;','아직 DISTINCT를 쓰지 않으면 중복도 나옵니다.'],
    ['1단계 SELECT 기초','10. 중복 없는 출판사','Book에서 publisher를 중복 없이 조회하세요.','','SELECT DISTINCT publisher FROM Book;','DISTINCT는 중복 제거입니다.']
  ].forEach(x=>push(...x));

  // 11~20: WHERE / LIKE / wildcard / NULL (빈칸과 SQL 작성 혼합)
  [
    ['2단계 WHERE/LIKE 핵심','11. WHERE 위치','가격이 10000원 이상인 도서를 고르려면 빈칸에 들어갈 절은?','SELECT * FROM Book ____ price >= 10000;','WHERE','WHERE는 행 조건을 시작하는 절입니다.'],
    ['2단계 WHERE/LIKE 핵심','12. 문자 조건 값','출판사가 굿스포츠인 조건의 오른쪽 값을 쓰세요.','SELECT * FROM Book WHERE publisher = ____;','\'굿스포츠\'','문자열은 따옴표로 감쌉니다.'],
    ['2단계 WHERE/LIKE 핵심','13. 포함 검색 패턴','도서명에 축구가 포함되도록 LIKE 패턴을 쓰세요.','SELECT * FROM Book WHERE bookname LIKE ____;','\'%축구%\'','%축구%는 앞뒤에 어떤 글자가 와도 됩니다.'],
    ['2단계 WHERE/LIKE 핵심','14. 시작 검색 패턴','이름이 박으로 시작하도록 LIKE 패턴을 쓰세요.','SELECT * FROM Customer WHERE name LIKE ____;','\'박%\'','박%는 박으로 시작하는 모든 문자열입니다.'],
    ['2단계 WHERE/LIKE 핵심','15. 한 글자 와일드카드','두 번째 글자가 구인 2글자 단어 패턴을 쓰세요. 예: 축구','SELECT * FROM Book WHERE bookname LIKE ____;','\'_구%\'','_는 정확히 한 글자, %는 0글자 이상입니다.'],
    ['2단계 WHERE/LIKE 핵심','16. 범위 키워드','가격이 10000원 이상 20000원 이하가 되도록 키워드를 채우세요.','SELECT * FROM Book WHERE price ____ 10000 AND 20000;','BETWEEN','BETWEEN A AND B는 A 이상 B 이하입니다.'],
    ['2단계 WHERE/LIKE 핵심','17. 목록 조건 키워드','출판사가 굿스포츠 또는 대한미디어 중 하나인지 검사하는 키워드는?','SELECT * FROM Book WHERE publisher ____ (\'굿스포츠\', \'대한미디어\');','IN','IN은 여러 값 중 하나와 일치하는지 검사합니다.'],
    ['2단계 WHERE/LIKE 핵심','18. NULL 비교','전화번호가 NULL인 고객을 찾는 조건을 완성하세요.','SELECT * FROM Customer WHERE phone ____ NULL;','IS','NULL은 =가 아니라 IS NULL로 비교합니다.'],
    ['2단계 WHERE/LIKE 핵심','19. NOT LIKE 활용','도서명에 축구가 포함되지 않은 도서를 조회하세요.','','SELECT * FROM Book WHERE bookname NOT LIKE \'%축구%\';','NOT LIKE는 패턴에 맞지 않는 행을 찾습니다.'],
    ['2단계 WHERE/LIKE 핵심','20. AND 조건 활용','굿스포츠 출판사이면서 가격이 7000원 이상인 도서를 조회하세요.','','SELECT * FROM Book WHERE publisher = \'굿스포츠\' AND price >= 7000;','AND는 두 조건을 모두 만족해야 합니다.']
  ].forEach(x=>push(...x));

  // 21~30: AND/OR/ORDER BY/LIMIT
  [
    ['3단계 조건 조합/정렬','21. AND 조건','굿스포츠 출판사이면서 가격이 7000원 이상인 도서를 조회하세요.','','SELECT * FROM Book WHERE publisher = \'굿스포츠\' AND price >= 7000;','AND는 조건을 모두 만족해야 합니다.'],
    ['3단계 조건 조합/정렬','22. OR 조건','출판사가 나무수 또는 삼성당인 도서를 조회하세요.','','SELECT * FROM Book WHERE publisher = \'나무수\' OR publisher = \'삼성당\';','OR는 둘 중 하나만 만족해도 됩니다.'],
    ['3단계 조건 조합/정렬','23. ORDER BY ASC','Book을 가격 오름차순으로 조회하세요.','','SELECT * FROM Book ORDER BY price ASC;','ASC는 오름차순입니다.'],
    ['3단계 조건 조합/정렬','24. ORDER BY DESC','Orders를 판매가격 내림차순으로 조회하세요.','','SELECT * FROM Orders ORDER BY saleprice DESC;','DESC는 내림차순입니다.'],
    ['3단계 조건 조합/정렬','25. 조건 후 정렬','가격이 10000원 이상인 도서를 가격 내림차순으로 조회하세요.','','SELECT * FROM Book WHERE price >= 10000 ORDER BY price DESC;','WHERE 후 ORDER BY를 씁니다.'],
    ['3단계 조건 조합/정렬','26. 여러 정렬 기준','Orders를 orderdate 오름차순, saleprice 내림차순으로 정렬하세요.','','SELECT * FROM Orders ORDER BY orderdate ASC, saleprice DESC;','정렬 기준도 쉼표로 여러 개 쓸 수 있습니다.'],
    ['3단계 조건 조합/정렬','27. 가장 비싼 도서','가장 비싼 도서 1권을 조회하세요.','','SELECT * FROM Book ORDER BY price DESC LIMIT 1;','정렬 후 LIMIT 1을 사용합니다.'],
    ['3단계 조건 조합/정렬','28. 가장 싼 도서명','가장 싼 도서명을 조회하세요.','','SELECT bookname FROM Book ORDER BY price ASC LIMIT 1;','오름차순 첫 행이 최솟값입니다.'],
    ['3단계 조건 조합/정렬','29. 최근 주문 3건','주문일자가 최근인 주문 3건을 조회하세요.','','SELECT * FROM Orders ORDER BY orderdate DESC LIMIT 3;','날짜도 정렬할 수 있습니다.'],
    ['3단계 조건 조합/정렬','30. 할인 주문','정가보다 싸게 판매된 주문의 orderid를 조회하세요.','Book과 Orders를 비교해야 합니다.','SELECT Orders.orderid FROM Orders JOIN Book ON Orders.bookid = Book.bookid WHERE Orders.saleprice < Book.price;','두 테이블 값 비교에는 JOIN이 필요합니다.']
  ].forEach(x=>push(...x));

  // 31~40: aggregate basics
  [
    ['4단계 집계 함수','31. 도서 수','Book 전체 행 수를 구하세요.','','SELECT COUNT(*) FROM Book;','COUNT(*)는 행 수입니다.'],
    ['4단계 집계 함수','32. 주문 합계','전체 주문 판매금액 합계를 구하세요.','','SELECT SUM(saleprice) FROM Orders;','SUM은 합계입니다.'],
    ['4단계 집계 함수','33. 평균 도서 가격','도서 평균 가격을 구하세요.','','SELECT AVG(price) FROM Book;','AVG는 평균입니다.'],
    ['4단계 집계 함수','34. 최저/최고 가격','도서의 최저 가격과 최고 가격을 함께 구하세요.','','SELECT MIN(price), MAX(price) FROM Book;','집계 함수 여러 개를 함께 SELECT할 수 있습니다.'],
    ['4단계 집계 함수','35. 주문한 고객 종류 수','주문한 고객번호의 종류 수를 구하세요.','','SELECT COUNT(DISTINCT custid) FROM Orders;','COUNT(DISTINCT 컬럼)은 중복 없는 개수입니다.'],
    ['4단계 집계 함수','36. 비싼 도서 수','가격이 20000원 이상인 도서 수를 구하세요.','','SELECT COUNT(*) FROM Book WHERE price >= 20000;','WHERE로 먼저 거른 뒤 COUNT합니다.'],
    ['4단계 집계 함수','37. 특정 고객 총액','custid가 1인 고객의 총 주문금액을 구하세요.','','SELECT SUM(saleprice) FROM Orders WHERE custid = 1;','조건에 맞는 주문만 합산합니다.'],
    ['4단계 집계 함수','38. 특정 날짜 주문 수','2020-07-03의 주문 수를 구하세요.','','SELECT COUNT(*) FROM Orders WHERE orderdate = \'2020-07-03\';','날짜도 문자열처럼 따옴표로 비교합니다.'],
    ['4단계 집계 함수','39. 판매가 평균 이상','판매가격이 전체 평균 판매가격 이상인 주문을 조회하세요.','','SELECT * FROM Orders WHERE saleprice >= (SELECT AVG(saleprice) FROM Orders);','전체 평균은 서브쿼리로 구합니다.'],
    ['4단계 집계 함수','40. 출판사별 도서 수','출판사별 도서 수를 구하세요.','','SELECT publisher, COUNT(*) FROM Book GROUP BY publisher;','그룹별 집계의 시작입니다.']
  ].forEach(x=>push(...x));

  // 41~50: JOIN / OUTER JOIN까지 기본 개념 완성
  [
    ['5단계 JOIN/OUTER JOIN 개념','41. INNER JOIN 기본','고객명과 주문번호를 INNER JOIN으로 조회하세요.','','SELECT Customer.name, Orders.orderid FROM Customer INNER JOIN Orders ON Customer.custid = Orders.custid;','INNER JOIN은 양쪽에 연결되는 행만 보여줍니다.'],
    ['5단계 JOIN/OUTER JOIN 개념','42. JOIN ON 빈칸','Customer와 Orders를 연결하는 조건 키워드를 쓰세요.','FROM Customer JOIN Orders ____ Customer.custid = Orders.custid','ON','ON 뒤에 두 테이블의 연결 조건을 씁니다.'],
    ['5단계 JOIN/OUTER JOIN 개념','43. 도서 주문 JOIN','도서명과 주문번호를 조회하세요.','','SELECT Book.bookname, Orders.orderid FROM Book JOIN Orders ON Book.bookid = Orders.bookid;','Book과 Orders는 bookid로 연결합니다.'],
    ['5단계 JOIN/OUTER JOIN 개념','44. 3테이블 JOIN','고객명, 도서명, 판매가격을 함께 조회하세요.','','SELECT Customer.name, Book.bookname, Orders.saleprice FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid;','Customer-Orders-Book을 순서대로 연결합니다.'],
    ['5단계 JOIN/OUTER JOIN 개념','45. LEFT OUTER JOIN','주문이 없는 고객도 포함되도록 고객과 주문을 조인하세요.','','SELECT Customer.name, Orders.orderid FROM Customer LEFT OUTER JOIN Orders ON Customer.custid = Orders.custid;','LEFT OUTER JOIN은 왼쪽 Customer를 모두 살립니다.'],
    ['5단계 JOIN/OUTER JOIN 개념','46. 주문 없는 고객 찾기','LEFT OUTER JOIN으로 주문한 적 없는 고객을 조회하세요.','','SELECT Customer.* FROM Customer LEFT OUTER JOIN Orders ON Customer.custid = Orders.custid WHERE Orders.orderid IS NULL;','LEFT JOIN 후 오른쪽 값이 NULL인 행을 찾습니다.'],
    ['5단계 JOIN/OUTER JOIN 개념','47. RIGHT OUTER JOIN','모든 주문을 기준으로 도서 정보를 붙이는 RIGHT OUTER JOIN을 작성하세요.','','SELECT Book.bookname, Orders.orderid FROM Book RIGHT OUTER JOIN Orders ON Book.bookid = Orders.bookid;','RIGHT OUTER JOIN은 오른쪽 Orders를 모두 살립니다.'],
    ['5단계 JOIN/OUTER JOIN 개념','48. 주문 없는 도서 찾기','LEFT OUTER JOIN으로 주문된 적 없는 도서를 조회하세요.','','SELECT Book.* FROM Book LEFT OUTER JOIN Orders ON Book.bookid = Orders.bookid WHERE Orders.orderid IS NULL;','Book을 왼쪽에 두면 주문 없는 도서도 남습니다.'],
    ['5단계 JOIN/OUTER JOIN 개념','49. GROUP BY와 JOIN','고객 이름별 주문 개수를 구하세요.','','SELECT Customer.name, COUNT(Orders.orderid) FROM Customer LEFT OUTER JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name;','JOIN 결과를 고객별로 묶어 집계합니다.'],
    ['5단계 JOIN/OUTER JOIN 개념','50. HAVING과 JOIN','주문 개수가 2개 이상인 고객명과 주문 수를 구하세요.','','SELECT Customer.name, COUNT(*) FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name HAVING COUNT(*) >= 2;','50번까지 SELECT, WHERE, LIKE, 집계, JOIN, OUTER JOIN, HAVING 개념을 모두 다룹니다.']
  ].forEach(x=>push(...x));

  // 51~60: concept application mixed practice
  [
    ['6단계 활용 시작','51. 조건+LIKE+정렬','도서명에 축구가 포함된 도서를 가격 높은 순으로 조회하세요.','','SELECT * FROM Book WHERE bookname LIKE \'%축구%\' ORDER BY price DESC;','LIKE와 ORDER BY를 함께 사용합니다.'],
    ['6단계 활용 시작','52. WHERE+IN+정렬','굿스포츠 또는 이상미디어 출판사의 도서를 가격 오름차순으로 조회하세요.','',"SELECT * FROM Book WHERE publisher IN ('굿스포츠', '이상미디어') ORDER BY price ASC;",'IN으로 목록 조건을 만들고 정렬합니다.'],
    ['6단계 활용 시작','53. JOIN+WHERE','박지성이 주문한 도서명과 판매가격을 조회하세요.','','SELECT Book.bookname, Orders.saleprice FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Customer.name = \'박지성\';','3테이블 JOIN 후 특정 고객 조건입니다.'],
    ['6단계 활용 시작','54. JOIN+LIKE','야구 도서를 주문한 고객명과 도서명을 조회하세요.','','SELECT Customer.name, Book.bookname FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Book.bookname LIKE \'%야구%\';','LIKE 조건을 조인 결과에 적용합니다.'],
    ['6단계 활용 시작','55. JOIN+BETWEEN','판매가격이 10000~20000원인 주문의 고객명, 도서명을 조회하세요.','','SELECT Customer.name, Book.bookname FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Orders.saleprice BETWEEN 10000 AND 20000;','BETWEEN과 JOIN 조합입니다.'],
    ['6단계 활용 시작','56. LEFT OUTER JOIN 활용','주문 없는 고객도 포함해 고객명과 주문번호를 조회하세요.','','SELECT Customer.name, Orders.orderid FROM Customer LEFT OUTER JOIN Orders ON Customer.custid = Orders.custid;','주문 없는 고객은 orderid가 NULL로 나옵니다.'],
    ['6단계 활용 시작','57. RIGHT OUTER JOIN 활용','모든 주문을 기준으로 주문번호와 고객명을 조회하세요.','','SELECT Orders.orderid, Customer.name FROM Customer RIGHT OUTER JOIN Orders ON Customer.custid = Orders.custid;','오른쪽 Orders의 모든 행을 살립니다.'],
    ['6단계 활용 시작','58. GROUP+ORDER','고객별 총 판매금액을 구하고 총액 내림차순으로 정렬하세요.','','SELECT Customer.name, SUM(Orders.saleprice) AS total FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name ORDER BY total DESC;','JOIN+GROUP BY+ORDER BY입니다.'],
    ['6단계 활용 시작','59. HAVING 활용','총 판매금액이 25000원 이상인 고객명과 총액을 조회하세요.','','SELECT Customer.name, SUM(Orders.saleprice) AS total FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name HAVING SUM(Orders.saleprice) >= 25000;','집계 조건은 HAVING입니다.'],
    ['6단계 활용 시작','60. NOT EXISTS 활용','주문된 적 없는 도서를 NOT EXISTS로 조회하세요.','','SELECT * FROM Book WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.bookid = Book.bookid);','서브쿼리로 존재하지 않는 관계를 찾습니다.']
  ].forEach(x=>push(...x));

  // 61~70: join + group
  [
    ['7단계 JOIN+GROUP','61. 고객 이름별 주문 수','고객 이름별 주문 개수를 구하세요.','','SELECT Customer.name, COUNT(*) FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name;','이름을 출력하려면 Customer와 조인합니다.'],
    ['7단계 JOIN+GROUP','62. 고객 이름별 총액','고객 이름별 총 판매금액을 구하세요.','','SELECT Customer.name, SUM(Orders.saleprice) FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name;','JOIN 후 GROUP BY입니다.'],
    ['7단계 JOIN+GROUP','63. 도서명별 주문 수','도서명별 주문 개수를 구하세요.','','SELECT Book.bookname, COUNT(*) FROM Book JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.bookid, Book.bookname;','도서명을 보여주기 위해 Book과 조인합니다.'],
    ['7단계 JOIN+GROUP','64. 출판사별 판매금액','출판사별 총 판매금액을 구하세요.','','SELECT Book.publisher, SUM(Orders.saleprice) FROM Book JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.publisher;','주문금액을 출판사 단위로 합칩니다.'],
    ['7단계 JOIN+GROUP','65. 고객별 평균 주문금액','고객 이름별 평균 주문금액을 구하세요.','','SELECT Customer.name, AVG(Orders.saleprice) FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name;','AVG를 조인 그룹에 적용합니다.'],
    ['7단계 JOIN+GROUP','66. 총액 30000 이상 고객명','총 판매금액이 30000원 이상인 고객명과 총액을 구하세요.','','SELECT Customer.name, SUM(Orders.saleprice) FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name HAVING SUM(Orders.saleprice) >= 30000;','JOIN + GROUP BY + HAVING입니다.'],
    ['7단계 JOIN+GROUP','67. 주문 3개 이상 고객명','주문 개수가 3개 이상인 고객명과 주문 수를 구하세요.','','SELECT Customer.name, COUNT(*) FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name HAVING COUNT(*) >= 3;','COUNT 조건은 HAVING입니다.'],
    ['7단계 JOIN+GROUP','68. 많이 팔린 도서 정렬','도서명별 주문 수를 구하고 주문 수 내림차순 정렬하세요.','','SELECT Book.bookname, COUNT(*) AS cnt FROM Book JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.bookid, Book.bookname ORDER BY cnt DESC;','집계 결과 정렬입니다.'],
    ['7단계 JOIN+GROUP','69. 출판사별 판매금액 정렬','출판사별 총 판매금액을 구하고 총액 내림차순 정렬하세요.','','SELECT Book.publisher, SUM(Orders.saleprice) AS total FROM Book JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.publisher ORDER BY total DESC;','출판사 단위 매출 비교입니다.'],
    ['7단계 JOIN+GROUP','70. 고객별 주문도서 종류 수','고객 이름별 주문한 도서 종류 수를 구하세요.','','SELECT Customer.name, COUNT(DISTINCT Orders.bookid) FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name;','DISTINCT를 그룹 안에서 사용합니다.']
  ].forEach(x=>push(...x));

  // 71~80: OUTER JOIN / no orders
  [
    ['8단계 OUTER JOIN/서브쿼리','71. 주문 없는 고객 LEFT JOIN','LEFT JOIN으로 주문한 적 없는 고객을 조회하세요.','','SELECT Customer.* FROM Customer LEFT JOIN Orders ON Customer.custid = Orders.custid WHERE Orders.orderid IS NULL;','왼쪽 Customer를 모두 살린 뒤 주문 없는 행을 찾습니다.'],
    ['8단계 OUTER JOIN/서브쿼리','72. 주문 없는 도서 LEFT JOIN','LEFT JOIN으로 주문된 적 없는 도서를 조회하세요.','','SELECT Book.* FROM Book LEFT JOIN Orders ON Book.bookid = Orders.bookid WHERE Orders.orderid IS NULL;','Book을 왼쪽에 둡니다.'],
    ['8단계 OUTER JOIN/서브쿼리','73. 모든 고객 주문 수','주문이 없는 고객도 포함해 고객별 주문 수를 구하세요.','','SELECT Customer.name, COUNT(Orders.orderid) FROM Customer LEFT JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name;','LEFT JOIN에서는 COUNT(*)보다 COUNT(Orders.orderid)가 안전합니다.'],
    ['8단계 OUTER JOIN/서브쿼리','74. 모든 도서 주문 수','주문 없는 도서도 포함해 도서별 주문 수를 구하세요.','','SELECT Book.bookname, COUNT(Orders.orderid) FROM Book LEFT JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.bookid, Book.bookname;','주문 없는 도서는 0으로 나옵니다.'],
    ['8단계 OUTER JOIN/서브쿼리','75. 주문한 고객 EXISTS','EXISTS로 주문한 적 있는 고객을 조회하세요.','','SELECT * FROM Customer WHERE EXISTS (SELECT * FROM Orders WHERE Orders.custid = Customer.custid);','EXISTS는 관련 행 존재 여부입니다.'],
    ['8단계 OUTER JOIN/서브쿼리','76. 주문 없는 고객 NOT EXISTS','NOT EXISTS로 주문한 적 없는 고객을 조회하세요.','','SELECT * FROM Customer WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.custid = Customer.custid);','존재하지 않는 경우를 찾습니다.'],
    ['8단계 OUTER JOIN/서브쿼리','77. 주문 없는 도서 NOT EXISTS','NOT EXISTS로 주문된 적 없는 도서를 조회하세요.','','SELECT * FROM Book WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.bookid = Book.bookid);','Book 기준 관련 Orders가 없는 행입니다.'],
    ['8단계 OUTER JOIN/서브쿼리','78. 평균보다 비싼 도서','전체 평균 가격보다 비싼 도서를 조회하세요.','','SELECT * FROM Book WHERE price > (SELECT AVG(price) FROM Book);','비교 기준을 서브쿼리로 계산합니다.'],
    ['8단계 OUTER JOIN/서브쿼리','79. 주문된 도서만 IN','한 번이라도 주문된 도서를 IN 서브쿼리로 조회하세요.','','SELECT * FROM Book WHERE bookid IN (SELECT bookid FROM Orders);','IN 안에 서브쿼리를 넣을 수 있습니다.'],
    ['8단계 OUTER JOIN/서브쿼리','80. 주문 안 된 도서 NOT IN','주문된 적 없는 도서를 NOT IN으로 조회하세요.','','SELECT * FROM Book WHERE bookid NOT IN (SELECT bookid FROM Orders);','NOT IN은 목록에 없는 값을 찾습니다.']
  ].forEach(x=>push(...x));

  // 81~90: advanced subquery / derived table
  [
    ['9단계 고급 서브쿼리','81. 최고가 도서','가격이 최고가인 도서를 서브쿼리로 조회하세요.','','SELECT * FROM Book WHERE price = (SELECT MAX(price) FROM Book);','MAX 결과와 price를 비교합니다.'],
    ['9단계 고급 서브쿼리','82. 최다 주문 고객','주문 개수가 가장 많은 고객명을 조회하세요.','','SELECT Customer.name FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name ORDER BY COUNT(*) DESC LIMIT 1;','그룹 집계 후 정렬하고 LIMIT 1입니다.'],
    ['9단계 고급 서브쿼리','83. 최고 매출 고객','총 판매금액이 가장 큰 고객명과 총액을 조회하세요.','','SELECT Customer.name, SUM(Orders.saleprice) AS total FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name ORDER BY total DESC LIMIT 1;','SUM 기준 최상위 그룹입니다.'],
    ['9단계 고급 서브쿼리','84. 평균 이상 매출 고객','고객별 총액이 고객별 총액 평균 이상인 고객번호와 총액을 조회하세요.','','SELECT custid, SUM(saleprice) AS total FROM Orders GROUP BY custid HAVING SUM(saleprice) >= (SELECT AVG(t.total) FROM (SELECT SUM(saleprice) AS total FROM Orders GROUP BY custid) t);','그룹별 합계들의 평균과 비교합니다.'],
    ['9단계 고급 서브쿼리','85. 출판사 평균보다 비싼 도서','자기 출판사의 평균 가격보다 비싼 도서를 조회하세요.','','SELECT * FROM Book b WHERE price > (SELECT AVG(price) FROM Book WHERE publisher = b.publisher);','상관 서브쿼리입니다.'],
    ['9단계 고급 서브쿼리','86. 고객별 마지막 주문일','고객명별 마지막 주문일을 조회하세요.','','SELECT Customer.name, MAX(Orders.orderdate) FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name;','날짜의 MAX가 마지막 주문일입니다.'],
    ['9단계 고급 서브쿼리','87. 가장 최근 주문 상세','가장 최근 주문의 고객명, 도서명, 주문일자를 조회하세요.','','SELECT Customer.name, Book.bookname, Orders.orderdate FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Orders.orderdate = (SELECT MAX(orderdate) FROM Orders);','최신 날짜를 서브쿼리로 구합니다.'],
    ['9단계 고급 서브쿼리','88. 할인액 계산','각 주문의 고객명, 도서명, 정가-판매가 할인액을 조회하세요.','','SELECT Customer.name, Book.bookname, Book.price - Orders.saleprice AS discount FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid;','SELECT에서 산술식을 사용할 수 있습니다.'],
    ['9단계 고급 서브쿼리','89. 할인액 있는 주문만','할인액이 0보다 큰 주문의 고객명, 도서명, 할인액을 조회하세요.','','SELECT Customer.name, Book.bookname, Book.price - Orders.saleprice AS discount FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Book.price - Orders.saleprice > 0;','계산식을 WHERE에서도 사용할 수 있습니다.'],
    ['9단계 고급 서브쿼리','90. 출판사별 주문 고객 종류','출판사별로 주문한 고객 종류 수를 구하세요.','','SELECT Book.publisher, COUNT(DISTINCT Orders.custid) FROM Book JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.publisher;','JOIN 후 DISTINCT 집계입니다.']
  ].forEach(x=>push(...x));

  // 91~100: hard mixed final - simple SELECT 없음
  [
    ['10단계 최종 종합','91. LEFT OUTER JOIN 종합','주문 없는 고객도 포함해 고객명, 주문 수, 총 판매금액을 조회하고 주문 수 내림차순으로 정렬하세요.','','SELECT Customer.name, COUNT(Orders.orderid) AS order_count, SUM(Orders.saleprice) AS total FROM Customer LEFT OUTER JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name ORDER BY order_count DESC;','LEFT OUTER JOIN, GROUP BY, COUNT, SUM, ORDER BY를 함께 씁니다.'],
    ['10단계 최종 종합','92. RIGHT OUTER JOIN 종합','모든 주문을 기준으로 고객명, 주문번호, 도서명을 조회하고 주문번호 오름차순 정렬하세요.','','SELECT Customer.name, Orders.orderid, Book.bookname FROM Customer RIGHT OUTER JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid ORDER BY Orders.orderid ASC;','RIGHT OUTER JOIN으로 Orders를 기준에 둡니다.'],
    ['10단계 최종 종합','93. LIKE+GROUP+HAVING','도서명에 구가 포함된 도서를 주문한 고객별 주문 수를 구하고 1개 이상인 고객만 조회하세요.','','SELECT Customer.name, COUNT(*) AS cnt FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Book.bookname LIKE \'%구%\' GROUP BY Customer.custid, Customer.name HAVING COUNT(*) >= 1;','LIKE 필터 후 그룹 집계합니다.'],
    ['10단계 최종 종합','94. 평균 초과 주문 상세','전체 평균 판매가격보다 비싼 주문의 고객명, 도서명, 판매가격을 판매가격 내림차순으로 조회하세요.','','SELECT Customer.name, Book.bookname, Orders.saleprice FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Orders.saleprice > (SELECT AVG(saleprice) FROM Orders) ORDER BY Orders.saleprice DESC;','서브쿼리 평균과 JOIN 결과를 함께 사용합니다.'],
    ['10단계 최종 종합','95. 출판사별 고객 종류','출판사별 주문 고객 종류 수와 총 판매금액을 구하고 총액 내림차순 정렬하세요.','','SELECT Book.publisher, COUNT(DISTINCT Orders.custid) AS customer_count, SUM(Orders.saleprice) AS total FROM Book JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.publisher ORDER BY total DESC;','DISTINCT 집계와 SUM을 함께 씁니다.'],
    ['10단계 최종 종합','96. 할인액 조건 종합','할인액이 1000원 이상인 주문의 고객명, 도서명, 할인액을 할인액 내림차순으로 조회하세요.','','SELECT Customer.name, Book.bookname, Book.price - Orders.saleprice AS discount FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Book.price - Orders.saleprice >= 1000 ORDER BY discount DESC;','계산식, WHERE, ORDER BY를 함께 사용합니다.'],
    ['10단계 최종 종합','97. 고객별 평균 비교','고객별 평균 주문금액이 전체 평균 주문금액 이상인 고객명과 평균 주문금액을 조회하세요.','','SELECT Customer.name, AVG(Orders.saleprice) AS avg_sale FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name HAVING AVG(Orders.saleprice) >= (SELECT AVG(saleprice) FROM Orders);','그룹 평균과 전체 평균을 비교합니다.'],
    ['10단계 최종 종합','98. 어려운 종합 1','주문 없는 도서도 포함해 도서명, 출판사, 주문 수, 총 판매금액을 조회하고 주문 수 0개인 도서도 보이게 하세요.','','SELECT Book.bookname, Book.publisher, COUNT(Orders.orderid) AS order_count, SUM(Orders.saleprice) AS total FROM Book LEFT OUTER JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.bookid, Book.bookname, Book.publisher ORDER BY order_count DESC;','단순 SELECT가 아니라 OUTER JOIN과 집계를 함께 씁니다.'],
    ['10단계 최종 종합','99. 어려운 종합 2','고객별 주문 수, 총액, 평균액을 구하되 주문 수가 2개 이상인 고객만 총액 내림차순으로 조회하세요.','','SELECT Customer.name, COUNT(*) AS order_count, SUM(Orders.saleprice) AS total, AVG(Orders.saleprice) AS avg_sale FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name HAVING COUNT(*) >= 2 ORDER BY total DESC;','JOIN, COUNT, SUM, AVG, HAVING, ORDER BY를 모두 사용합니다.'],
    ['10단계 최종 종합','100. 최종 어려운 종합','출판사별 총 판매금액이 전체 주문 평균 판매가격보다 큰 출판사와 총액을 조회하고 총액 내림차순 정렬하세요.','','SELECT Book.publisher, SUM(Orders.saleprice) AS total FROM Book JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.publisher HAVING SUM(Orders.saleprice) > (SELECT AVG(saleprice) FROM Orders) ORDER BY total DESC;','마지막 문제는 JOIN, GROUP BY, HAVING, 서브쿼리, ORDER BY를 결합합니다.']
  ].forEach(x=>push(...x));
}

buildFillBlank100();
buildProgressive100();
buildResult100();
questions.slice(100,200).forEach(q=>{ q[0] = `2유형 구문 작성하기 - ${q[0]}`; });

let current = Number(localStorage.getItem('mysqlQuizCurrent') || 0);
if(current >= questions.length) current = 0;
const saved = JSON.parse(localStorage.getItem('mysqlQuizAnswers') || '{}');
const solved = JSON.parse(localStorage.getItem('mysqlQuizSolved') || '{}');

const $ = id => document.getElementById(id);
function makeTable(title, rows, columns){
  const head = columns.map(c=>`<th>${c}</th>`).join('');
  const body = rows.map(row=>`<tr>${columns.map(c=>`<td>${row[c]}</td>`).join('')}</tr>`).join('');
  return `<div class="schema-table-wrap"><h4>${title}</h4><table><tr>${head}</tr>${body}</table></div>`;
}
function schemaTablesHtml(){
  return `<div class="schema-grid">
    ${makeTable('Book', bookRows, ['bookid','bookname','publisher','price'])}
    ${makeTable('Orders', orderRows, ['orderid','custid','bookid','saleprice','orderdate'])}
    ${makeTable('Customer', customerRows, ['custid','name','address','phone'])}
  </div>`;
}
function renderSchemaPanel(){
  const box = $('schemaPanelBody');
  if(!box) return;
  box.innerHTML = schemaTablesHtml();
}
function openSchemaPanel(){
  $('quizView').classList.add('schema-open');
  $('schemaPanel').classList.remove('hidden');
}
function closeSchemaPanel(){
  $('quizView').classList.remove('schema-open');
  $('schemaPanel').classList.add('hidden');
}
function normalize(s){return s.toLowerCase().replace(/;\s*$/,'').replace(/\s+/g,' ').trim();}
function compactAnswer(s){return s.toLowerCase().replace(/[，、]/g,',').replace(/;/g,'').replace(/\s+/g,'').trim();}
function listAnswer(s){
  return s.toLowerCase()
    .replace(/[，、]/g,',')
    .replace(/;/g,'')
    .split(',')
    .map(x=>x.replace(/\s+/g,'').trim())
    .filter(Boolean);
}
function sameListAnswer(a,b){
  const aa=listAnswer(a), bb=listAnswer(b);
  if(aa.length<=1 || bb.length<=1) return false;
  if(aa.length!==bb.length) return false;
  return aa.every((v,i)=>v===bb[i]) || aa.slice().sort().every((v,i)=>v===bb.slice().sort()[i]);
}
function getExplanation(q){
  const type=q[0], ans=q[4];
  if(type.includes('실행결과') || type.includes('빈칸')) return `정답: ${ans}`;
  return `정답 SQL:\n${ans}`;
}
function currentTypeStart(){ return Math.floor(current / 100) * 100; }
function resultHeader(sql){
  const m = (sql || '').match(/select\s+([\s\S]*?)\s+from/i);
  if(!m) return '[결과]';
  const cols = m[1].split(',').map(x=>x.trim()).filter(Boolean);
  if(cols.length === 1) return `[${cols[0]}]`;
  return `[${cols.join('] [')}]`;
}
function blankSql(sql){ return (sql || '').replace(/____/g, '(  )'); }
function formatQuestionText(q){
  const type=q[0], text=q[2];
  if(type.includes('실행결과')) return `<SQL 구문>의 <실행 결과>를 작성하시오.\n(단, 아래 형식에 맞게 작성하시오.)`;
  if(type.includes('구문 작성')) return `<SQL 질의>에 따른 <SQL 구문>에 알맞은 코드를 작성하시오.\n\n<SQL 질의>\n${text}`;
  if(type.includes('빈칸')) return `<SQL 구문>에 따른 조건을 보고 빈칸에 알맞은 코드를 작성하시오.\n\n<문제 조건>\n\n${text}`;
  return text;
}
function formatTemplate(q){
  const type=q[0], sql=q[3];
  if(type.includes('실행결과')) return `<SQL 구문>\n${sql}\n\n<실행결과>\n${resultHeader(sql)}`;
  if(type.includes('구문 작성')) return `<SQL 구문>\n직접 작성하세요.`;
  if(type.includes('빈칸')) return `<SQL 구문>\n${blankSql(sql)}`;
  return sql || 'SQL 전체를 직접 작성하세요.';
}
function render(){
  const q = questions[current];
  const typeStart = currentTypeStart();
  const localNum = current - typeStart + 1;
  $('numBadge').textContent = `${localNum} / 100`;
  $('levelBadge').textContent = q[0];
  $('questionTitle').textContent = q[1];
  $('questionText').textContent = formatQuestionText(q);
  $('templateBox').textContent = formatTemplate(q);
  $('answerInput').value = saved[current] || '';
  $('feedback').className='feedback'; $('feedback').textContent='';
  $('retryBtn').classList.add('hidden');
  $('hintBox').className='hint hidden'; $('hintBox').textContent=q[5];
  $('answerBox').className='answer hidden'; $('answerBox').textContent=getExplanation(q);
  $('prevBtn').disabled = current===0;
  $('nextBtn').disabled = current===questions.length-1;
  updateProgress(); localStorage.setItem('mysqlQuizCurrent', current);
}
function updateProgress(){
  const count = Object.keys(solved).filter(k=>Number(k)<questions.length).length;
  $('progressText').textContent = `${count} / ${questions.length}`;
  $('progressBar').style.width = `${count/questions.length*100}%`;
}
$('answerInput').addEventListener('input', e=>{saved[current]=e.target.value; localStorage.setItem('mysqlQuizAnswers',JSON.stringify(saved));});
function checkAnswer(){
  const q = questions[current];
  const user=normalize($('answerInput').value);
  const ans=normalize(q[4]);
  const userCompact=compactAnswer($('answerInput').value);
  const ansCompact=compactAnswer(q[4]);
  const isResultType = q[0].includes('실행결과');
  const isFillType = q[0].includes('빈칸');
  const ok = (isResultType || isFillType)
    ? userCompact===ansCompact || sameListAnswer($('answerInput').value, q[4])
    : userCompact===ansCompact || userCompact.includes(ansCompact) || sameListAnswer($('answerInput').value, q[4]);
  $('feedback').className='feedback '+(ok?'good':'bad');
  $('feedback').textContent=ok?'정답입니다!':'아직 달라요. 다시풀기를 누른 뒤 한 번 더 풀어보세요.';
  $('answerBox').classList.add('hidden');
  $('retryBtn').classList.remove('hidden');
  if(ok){ solved[current]=true; localStorage.setItem('mysqlQuizSolved',JSON.stringify(solved)); updateProgress(); }
}
$('answerInput').addEventListener('keydown', e=>{
  if(e.key==='Enter' && !e.shiftKey){
    e.preventDefault();
    checkAnswer();
  }
});
$('retryBtn').onclick=()=>{
  $('feedback').className='feedback';
  $('feedback').textContent='';
  $('answerBox').classList.add('hidden');
  $('hintBox').classList.add('hidden');
  $('retryBtn').classList.add('hidden');
  $('answerInput').focus();
};
$('hintBtn').onclick=()=>$('hintBox').classList.toggle('hidden');
$('showBtn').onclick=()=>$('answerBox').classList.toggle('hidden');
$('nextBtn').onclick=()=>{
  if(current<questions.length-1){current++;render();}
};
$('prevBtn').onclick=()=>{
  if(current>0){current--;render();}
};
document.querySelectorAll('.level[data-jump]').forEach(b=>b.onclick=()=>{current=Number(b.dataset.jump);render();});
document.querySelectorAll('.level[data-offset]').forEach(b=>b.onclick=()=>{current=currentTypeStart()+Number(b.dataset.offset);render();});
function jumpToQuestion(){
  const input = $('jumpInput');
  const n = Number(input.value);
  if(!Number.isInteger(n) || n < 1 || n > 100){
    alert('현재 유형 안에서 1~100 사이의 문제 번호만 입력하세요.');
    input.value='';
    input.focus();
    return;
  }
  current = currentTypeStart() + n - 1;
  render();
}
$('jumpBtn').onclick=jumpToQuestion;
$('jumpInput').addEventListener('keydown', e=>{
  if(e.key==='Enter'){
    e.preventDefault();
    jumpToQuestion();
  }
});
$('jumpInput').addEventListener('input', e=>{
  const n = Number(e.target.value);
  if(e.target.value && (n < 1 || n > 100)) e.target.value = String(Math.min(Math.max(n || 1, 1), 100));
});
$('resetBtn').onclick=()=>{if(confirm('진도와 입력 답안을 모두 지울까요?')){localStorage.removeItem('mysqlQuizCurrent');localStorage.removeItem('mysqlQuizAnswers');localStorage.removeItem('mysqlQuizSolved');location.reload();}};
function showQuiz(){ $('quizView').classList.remove('hidden'); $('conceptView').classList.add('hidden'); }
function showConcept(){ $('conceptView').classList.remove('hidden'); $('quizView').classList.add('hidden'); window.scrollTo({top:0, behavior:'smooth'}); }
$('quizViewBtn').onclick=showQuiz;
$('conceptViewBtn').onclick=showConcept;
$('sideConceptBtn').onclick=showConcept;
$('backToQuizBtn').onclick=showQuiz;
$('schemaBtn').onclick=openSchemaPanel;
$('closeSchemaPanel').onclick=closeSchemaPanel;
$('closeSchema').onclick=()=>$('schemaDialog').close();
renderSchemaPanel();
render();
