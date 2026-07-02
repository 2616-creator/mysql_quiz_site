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
  const q=[];
  const push=(title,text,template,answer,hint)=>q.push(['1단계 빈칸형',`${q.length+1}. ${title}`,text,template,answer,hint]);
  const cols=['bookid','bookname','publisher','price'];
  for(const col of cols) push(`${col} 열 조회`,`Book 테이블에서 ${col} 열을 조회하도록 빈칸을 채우세요.`,`SELECT ____ FROM Book;`,col,'SELECT 뒤에는 조회할 열 이름이 옵니다');
  for(const col of ['custid','name','address','phone']) push(`Customer ${col} 조회`,`Customer 테이블에서 ${col} 열을 조회하도록 빈칸을 채우세요.`,`SELECT ____ FROM Customer;`,col,'SELECT 뒤에는 조회할 열 이름이 옵니다');
  for(const col of ['orderid','custid','bookid','saleprice','orderdate']) push(`Orders ${col} 조회`,`Orders 테이블에서 ${col} 열을 조회하도록 빈칸을 채우세요.`,`SELECT ____ FROM Orders;`,col,'SELECT 뒤에는 조회할 열 이름이 옵니다');
  push('모든 열','Book 테이블의 모든 열을 조회하세요.','SELECT ____ FROM Book;','*','*는 모든 열입니다');
  for(const t of [7000,10000,13000,20000,30000]) push(`가격 ${t} 이상`,`가격이 ${t}원 이상인 도서 조건을 완성하세요.`,`SELECT * FROM Book ____ price >= ${t};`,'WHERE','WHERE는 행 조건입니다');
  for(const t of [7000,10000,13000,20000,21000]) push(`판매가 ${t} 이상`,`판매가격이 ${t}원 이상인 주문 조건을 완성하세요.`,`SELECT * FROM Orders ____ saleprice >= ${t};`,'WHERE','WHERE는 행 조건입니다');
  for(const word of ['축구','야구','올림픽','Olympic']) push(`LIKE ${word}`,`도서명에 ${word}가 포함되도록 패턴을 쓰세요.`,`SELECT * FROM Book WHERE bookname LIKE '____';`,`%${word}%`,'%는 0글자 이상을 뜻합니다');
  for(const ch of ['박','김','장','추']) push(`이름 시작 ${ch}`,`이름이 ${ch}(으)로 시작하는 패턴을 쓰세요.`,`SELECT * FROM Customer WHERE name LIKE '____';`,`${ch}%`,'%는 뒤에 어떤 글자가 와도 된다는 뜻입니다');
  for(const pub of uniq(bookRows.map(b=>b.publisher))) push(`출판사 ${pub}`,`출판사가 ${pub}인 조건의 오른쪽 값을 채우세요.`,`SELECT * FROM Book WHERE publisher = ____;`,`'${pub}'`,'문자열은 따옴표로 감쌉니다');
  for(const c of customerRows) push(`${c.name} 고객`,`이름이 ${c.name}인 조건의 오른쪽 값을 채우세요.`,`SELECT * FROM Customer WHERE name = ____;`,`'${c.name}'`,'문자열은 따옴표로 감쌉니다');
  for(const [fn,meaning] of [['COUNT','개수'],['SUM','합계'],['AVG','평균'],['MIN','최솟값'],['MAX','최댓값']]) push(`${fn} 함수`,`${meaning}을 구하는 집계 함수를 쓰세요.`,`SELECT ____(saleprice) FROM Orders;`,fn,`${fn}은 ${meaning} 집계 함수입니다`);
  for(const col of ['custid','bookid','orderdate']) push(`GROUP BY ${col}`,`${col}별로 주문을 묶도록 완성하세요.`,`SELECT ${col}, COUNT(*) FROM Orders ____ ${col};`,'GROUP BY','GROUP BY는 같은 값끼리 묶습니다');
  for(const n of [1,2,3,4]) push(`HAVING COUNT ${n}`,`주문 개수가 ${n}개 이상인 그룹 조건 절을 쓰세요.`,`SELECT custid, COUNT(*) FROM Orders GROUP BY custid ____ COUNT(*) >= ${n};`,'HAVING','집계 함수 조건은 HAVING입니다');
  for(const col of ['price','saleprice','orderid','bookid']) push(`ORDER BY ${col}`,`${col} 기준 정렬 키워드를 채우세요.`,`SELECT * FROM Orders ____ ${col};`,'ORDER BY','ORDER BY는 정렬 절입니다');
  for(const dir of [['오름차순','ASC'],['내림차순','DESC']]) push(`정렬 ${dir[0]}`,`${dir[0]} 정렬 키워드를 쓰세요.`,`SELECT * FROM Book ORDER BY price ____;`,dir[1],`${dir[1]} 정렬입니다`);
  for(const [a,b] of [[7000,13000],[10000,20000],[13000,35000]]) push(`BETWEEN ${a}-${b}`,`${a}원부터 ${b}원까지 범위 조건 키워드를 쓰세요.`,`WHERE price ____ ${a} AND ${b}`,'BETWEEN','BETWEEN A AND B는 A 이상 B 이하입니다');
  push('DISTINCT','중복 출판사를 제거하세요.','SELECT ____ publisher FROM Book;','DISTINCT','DISTINCT는 중복 제거입니다');
  push('COUNT DISTINCT','중복 없는 주문 도서 수를 구하세요.','SELECT COUNT(____ bookid) FROM Orders;','DISTINCT','COUNT 안에서도 DISTINCT를 쓸 수 있습니다');
  push('IS NULL','전화번호가 NULL인 조건을 완성하세요.','WHERE phone ____ NULL','IS','NULL은 =로 비교하지 않습니다');
  push('IS NOT NULL','전화번호가 NULL이 아닌 조건을 완성하세요.','WHERE phone IS ____ NULL','NOT','IS NOT NULL은 NULL이 아닌 값입니다');
  push('JOIN ON','Customer와 Orders의 조인 조건 키워드를 쓰세요.','FROM Customer JOIN Orders ____ Customer.custid = Orders.custid','ON','ON 뒤에 연결 조건을 씁니다');
  push('LEFT JOIN','왼쪽 Customer를 모두 살리는 조인 방향을 쓰세요.','FROM Customer ____ JOIN Orders ON Customer.custid = Orders.custid','LEFT','LEFT JOIN은 왼쪽 테이블을 모두 포함합니다');
  push('EXISTS','주문이 존재하는지 확인하는 키워드를 쓰세요.','WHERE ____ (SELECT * FROM Orders WHERE Orders.custid = Customer.custid)','EXISTS','EXISTS는 서브쿼리 결과 존재 여부입니다');
  push('NOT EXISTS','주문이 존재하지 않는 조건을 완성하세요.','WHERE ____ EXISTS (SELECT * FROM Orders WHERE Orders.custid = Customer.custid)','NOT','NOT EXISTS는 존재하지 않음을 뜻합니다');
  push('IN','여러 출판사 중 하나인지 보는 키워드입니다.','WHERE publisher ____ (\'굿스포츠\', \'대한미디어\')','IN','IN은 목록 중 하나와 일치하는지 확인합니다');
  push('AS','name에 고객명 별칭을 붙이세요.','SELECT name ____ 고객명 FROM Customer;','AS','AS는 별칭입니다');
  while(q.length<100) push(`복습 빈칸 ${q.length+1}`,'주문 테이블에서 모든 열을 조회하도록 빈칸을 채우세요.','SELECT ____ FROM Orders;','*','모든 열은 *입니다');
  q.slice(0,100).forEach(add);
}

function buildResult100(){
  const q=[];
  const push=(title,text,template,answer,hint)=>q.push(['2단계 실행결과 맞추기',`${q.length+1}. ${title}`,text,template,String(answer),hint]);
  push('Book 행 수','Book 테이블의 행 개수는?','bookid 1~10',10,'COUNT(*)는 행 수입니다');
  push('Customer 행 수','Customer 테이블의 행 개수는?','custid 1~5',5,'Customer는 5행입니다');
  push('Orders 행 수','Orders 테이블의 행 개수는?','orderid 1~10',10,'Orders는 10행입니다');
  push('최저 도서 가격','도서 가격의 최솟값은?','Book.price 전체',Math.min(...bookRows.map(b=>b.price)),'MIN 개념');
  push('최고 도서 가격','도서 가격의 최댓값은?','Book.price 전체',Math.max(...bookRows.map(b=>b.price)),'MAX 개념');
  push('판매가격 합계','전체 saleprice 합계는?','Orders.saleprice 전체',sum(orderRows.map(o=>o.saleprice)),'SUM 개념');
  push('평균 도서 가격','Book price 평균은?','총합 174500 / 10',17450,'AVG 개념');
  push('출판사 종류 수','서로 다른 publisher 개수는?','Book.publisher 전체',uniq(bookRows.map(b=>b.publisher)).length,'DISTINCT 개념');
  push('주문 고객 종류 수','서로 다른 주문 custid 개수는?','Orders.custid 전체',uniq(orderRows.map(o=>o.custid)).length,'COUNT DISTINCT');
  push('주문 도서 종류 수','서로 다른 주문 bookid 개수는?','Orders.bookid 전체',uniq(orderRows.map(o=>o.bookid)).length,'COUNT DISTINCT');
  for(const pub of uniq(bookRows.map(b=>b.publisher))) push(`${pub} 도서명`,`${pub} 출판사의 도서명을 쓰세요.`,'Book.publisher 기준',bookNames(bookRows.filter(b=>b.publisher===pub)) || '없음','WHERE publisher 조건');
  for(const t of [7000,8000,10000,13000,20000,30000]) push(`가격 ${t} 이상 도서 수`,`price >= ${t}인 도서 수는?`,'Book.price 기준',bookRows.filter(b=>b.price>=t).length,'WHERE 조건 후 COUNT');
  for(const t of [7000,10000,12000,13000,20000]) push(`판매가 ${t} 이상 주문 수`,`saleprice >= ${t}인 주문 수는?`,'Orders.saleprice 기준',orderRows.filter(o=>o.saleprice>=t).length,'WHERE 조건 후 COUNT');
  for(const c of customerRows) push(`${c.name} 주문 수`,`${c.name}의 주문 개수는?`,`custid=${c.custid}`,ordersByCust(c.custid).length,'고객별 COUNT');
  for(const c of customerRows) push(`${c.name} 총액`,`${c.name}의 총 saleprice는?`,`custid=${c.custid}`,sum(ordersByCust(c.custid).map(o=>o.saleprice)),'고객별 SUM');
  for(const b of bookRows) push(`${b.bookname} 주문 수`,`${b.bookname}의 주문 횟수는?`,`bookid=${b.bookid}`,ordersByBook(b.bookid).length,'도서별 COUNT');
  for(const d of uniq(orderRows.map(o=>o.orderdate))) push(`${d} 주문번호`,`orderdate가 ${d}인 orderid를 쓰세요.`,'Orders.orderdate 기준',orderIds(orderRows.filter(o=>o.orderdate===d)),'날짜 조건');
  for(const word of ['축구','야구','올림픽','Olympic']) push(`${word} 포함 도서`,`bookname에 ${word}가 포함된 도서명을 쓰세요.`,'LIKE 검색',bookNames(bookRows.filter(b=>b.bookname.includes(word))) || '없음','LIKE %검색어%');
  for(const ch of ['박','김','장','추']) push(`${ch} 시작 고객`,`이름이 ${ch}(으)로 시작하는 고객명을 쓰세요.`,'LIKE 검색',custNames(customerRows.filter(c=>c.name.startsWith(ch))) || '없음','LIKE 글자%');
  for(const o of orderRows) push(`주문 ${o.orderid} 고객`,`orderid ${o.orderid}의 고객명은?`,'Orders.custid와 Customer.custid 연결',cust(o.custid).name,'조인 개념의 결과 해석');
  for(const o of orderRows) push(`주문 ${o.orderid} 도서`,`orderid ${o.orderid}의 도서명은?`,'Orders.bookid와 Book.bookid 연결',book(o.bookid).bookname,'조인 개념의 결과 해석');
  push('주문 없는 고객','주문한 적 없는 고객명은?','Customer 중 Orders에 없는 custid','박세리','LEFT JOIN/NOT EXISTS 결과');
  push('주문 없는 도서','주문된 적 없는 도서명은?','Book 중 Orders에 없는 bookid','골프 바이블, 올림픽 이야기','LEFT JOIN/NOT EXISTS 결과');
  while(q.length<100) push(`추가 결과 ${q.length+1}`,'Book 테이블의 전체 행 수는?','Book',10,'COUNT(*)');
  q.slice(0,100).forEach(add);
}

function buildCodeResult100(){
  const q=[];
  const push=(title,sql,answer,hint)=>q.push(['2단계 코드 보고 결과 쓰기',`${q.length+1}. ${title}`,'다음 SQL의 실행결과를 쓰세요.',sql,String(answer),hint]);
  push('Book COUNT','SELECT COUNT(*) FROM Book;',10,'COUNT(*)');
  push('Orders COUNT','SELECT COUNT(*) FROM Orders;',10,'COUNT(*)');
  push('Customer COUNT','SELECT COUNT(*) FROM Customer;',5,'COUNT(*)');
  push('MIN price','SELECT MIN(price) FROM Book;',6000,'MIN');
  push('MAX price','SELECT MAX(price) FROM Book;',35000,'MAX');
  push('SUM saleprice','SELECT SUM(saleprice) FROM Orders;',sum(orderRows.map(o=>o.saleprice)),'SUM');
  push('AVG price','SELECT AVG(price) FROM Book;',17450,'AVG');
  for(const b of bookRows) push(`bookid ${b.bookid}` ,`SELECT bookname FROM Book WHERE bookid = ${b.bookid};`,b.bookname,'WHERE bookid');
  for(const c of customerRows) push(`custid ${c.custid}`,`SELECT name FROM Customer WHERE custid = ${c.custid};`,c.name,'WHERE custid');
  for(const o of orderRows) push(`orderid ${o.orderid} saleprice`,`SELECT saleprice FROM Orders WHERE orderid = ${o.orderid};`,o.saleprice,'WHERE orderid');
  for(const pub of uniq(bookRows.map(b=>b.publisher))) push(`${pub} COUNT`,`SELECT COUNT(*) FROM Book WHERE publisher = '${pub}';`,bookRows.filter(b=>b.publisher===pub).length,'WHERE + COUNT');
  for(const t of [7000,8000,10000,13000,20000,30000]) push(`price >= ${t}`,`SELECT COUNT(*) FROM Book WHERE price >= ${t};`,bookRows.filter(b=>b.price>=t).length,'WHERE + COUNT');
  for(const t of [7000,10000,12000,13000,20000]) push(`saleprice >= ${t}`,`SELECT COUNT(*) FROM Orders WHERE saleprice >= ${t};`,orderRows.filter(o=>o.saleprice>=t).length,'WHERE + COUNT');
  for(const c of customerRows) push(`${c.name} 주문 수`,`SELECT COUNT(*) FROM Orders WHERE custid = ${c.custid};`,ordersByCust(c.custid).length,'WHERE + COUNT');
  for(const c of customerRows) push(`${c.name} 총액`,`SELECT SUM(saleprice) FROM Orders WHERE custid = ${c.custid};`,sum(ordersByCust(c.custid).map(o=>o.saleprice)),'WHERE + SUM');
  for(const b of bookRows) push(`${b.bookname} 주문 수`,`SELECT COUNT(*) FROM Orders WHERE bookid = ${b.bookid};`,ordersByBook(b.bookid).length,'WHERE + COUNT');
  for(const word of ['축구','야구','Olympic']) push(`${word} LIKE`,`SELECT bookname FROM Book WHERE bookname LIKE '%${word}%';`,bookNames(bookRows.filter(b=>b.bookname.includes(word))) || '없음','LIKE');
  for(const o of orderRows) push(`주문 ${o.orderid} 고객명`,`SELECT Customer.name FROM Customer JOIN Orders ON Customer.custid = Orders.custid WHERE Orders.orderid = ${o.orderid};`,cust(o.custid).name,'JOIN 결과');
  for(const o of orderRows) push(`주문 ${o.orderid} 도서명`,`SELECT Book.bookname FROM Book JOIN Orders ON Book.bookid = Orders.bookid WHERE Orders.orderid = ${o.orderid};`,book(o.bookid).bookname,'JOIN 결과');
  push('HAVING 2','SELECT custid FROM Orders GROUP BY custid HAVING COUNT(*) >= 2;','1, 2, 3, 4','GROUP BY + HAVING');
  push('HAVING 3','SELECT custid FROM Orders GROUP BY custid HAVING COUNT(*) >= 3;','1, 3','GROUP BY + HAVING');
  push('NOT EXISTS Customer','SELECT name FROM Customer WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.custid = Customer.custid);','박세리','NOT EXISTS');
  push('NOT EXISTS Book','SELECT bookname FROM Book WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.bookid = Book.bookid);','골프 바이블, 올림픽 이야기','NOT EXISTS');
  while(q.length<100) push(`추가 코드 ${q.length+1}`,'SELECT COUNT(*) FROM Book;',10,'COUNT(*)');
  q.slice(0,100).forEach(add);
}

function buildSqlWrite100(){
  const q=[];
  const push=(title,text,answer,hint)=>q.push(['3단계 SQL 구문 작성',`${q.length+1}. ${title}`,text,'',answer,hint]);
  for(const col of ['bookid','bookname','publisher','price']) push(`Book ${col} 조회`,`Book 테이블에서 ${col}만 조회하세요.`,`SELECT ${col} FROM Book;`,'SELECT 기본');
  for(const col of ['custid','name','address','phone']) push(`Customer ${col} 조회`,`Customer 테이블에서 ${col}만 조회하세요.`,`SELECT ${col} FROM Customer;`,'SELECT 기본');
  for(const col of ['orderid','custid','bookid','saleprice','orderdate']) push(`Orders ${col} 조회`,`Orders 테이블에서 ${col}만 조회하세요.`,`SELECT ${col} FROM Orders;`,'SELECT 기본');
  push('전체 Book','Book 전체를 조회하세요.','SELECT * FROM Book;','*');
  push('전체 Customer','Customer 전체를 조회하세요.','SELECT * FROM Customer;','*');
  push('전체 Orders','Orders 전체를 조회하세요.','SELECT * FROM Orders;','*');
  for(const b of bookRows) push(`bookid ${b.bookid} 조회`,`bookid가 ${b.bookid}인 도서를 조회하세요.`,`SELECT * FROM Book WHERE bookid = ${b.bookid};`,'WHERE');
  for(const c of customerRows) push(`custid ${c.custid} 조회`,`custid가 ${c.custid}인 고객을 조회하세요.`,`SELECT * FROM Customer WHERE custid = ${c.custid};`,'WHERE');
  for(const pub of uniq(bookRows.map(b=>b.publisher))) push(`${pub} 조회`,`출판사가 ${pub}인 도서를 조회하세요.`,`SELECT * FROM Book WHERE publisher = '${pub}';`,'문자 조건');
  for(const t of [7000,8000,10000,13000,20000,30000]) push(`가격 ${t} 이상`,`가격이 ${t}원 이상인 도서를 조회하세요.`,`SELECT * FROM Book WHERE price >= ${t};`,'WHERE 비교');
  for(const t of [7000,10000,12000,13000,20000]) push(`판매가 ${t} 이상`,`판매가격이 ${t}원 이상인 주문을 조회하세요.`,`SELECT * FROM Orders WHERE saleprice >= ${t};`,'WHERE 비교');
  for(const word of ['축구','야구','올림픽','Olympic']) push(`${word} 포함`,`도서명에 ${word}가 포함된 도서를 조회하세요.`,`SELECT * FROM Book WHERE bookname LIKE '%${word}%';`,'LIKE');
  for(const ch of ['박','김','장','추']) push(`${ch} 시작`,`이름이 ${ch}(으)로 시작하는 고객을 조회하세요.`,`SELECT * FROM Customer WHERE name LIKE '${ch}%';`,'LIKE');
  for(const col of ['price','bookid','publisher']) push(`${col} 정렬`,`Book을 ${col} 기준 오름차순 정렬하세요.`,`SELECT * FROM Book ORDER BY ${col} ASC;`,'ORDER BY');
  for(const col of ['orderid','saleprice','orderdate']) push(`${col} 내림차순`,`Orders를 ${col} 기준 내림차순 정렬하세요.`,`SELECT * FROM Orders ORDER BY ${col} DESC;`,'ORDER BY DESC');
  push('중복 출판사','publisher를 중복 없이 조회하세요.','SELECT DISTINCT publisher FROM Book;','DISTINCT');
  push('주문 고객 종류 수','주문한 고객번호 종류 수를 구하세요.','SELECT COUNT(DISTINCT custid) FROM Orders;','COUNT DISTINCT');
  push('주문 도서 종류 수','주문된 도서번호 종류 수를 구하세요.','SELECT COUNT(DISTINCT bookid) FROM Orders;','COUNT DISTINCT');
  push('고객별 주문 수','고객번호별 주문 개수를 조회하세요.','SELECT custid, COUNT(*) FROM Orders GROUP BY custid;','GROUP BY');
  push('고객별 총액','고객번호별 총 판매금액을 조회하세요.','SELECT custid, SUM(saleprice) FROM Orders GROUP BY custid;','GROUP BY + SUM');
  push('도서별 주문 수','도서번호별 주문 개수를 조회하세요.','SELECT bookid, COUNT(*) FROM Orders GROUP BY bookid;','GROUP BY');
  push('주문 2개 이상','주문 개수가 2개 이상인 고객번호를 조회하세요.','SELECT custid, COUNT(*) FROM Orders GROUP BY custid HAVING COUNT(*) >= 2;','HAVING');
  push('전화번호 NULL','전화번호가 NULL인 고객을 조회하세요.','SELECT * FROM Customer WHERE phone IS NULL;','IS NULL');
  push('전화번호 NOT NULL','전화번호가 NULL이 아닌 고객을 조회하세요.','SELECT * FROM Customer WHERE phone IS NOT NULL;','IS NOT NULL');
  push('가격 BETWEEN','가격이 10000원 이상 20000원 이하인 도서를 조회하세요.','SELECT * FROM Book WHERE price BETWEEN 10000 AND 20000;','BETWEEN');
  push('출판사 IN','출판사가 굿스포츠 또는 대한미디어인 도서를 조회하세요.',"SELECT * FROM Book WHERE publisher IN ('굿스포츠', '대한미디어');",'IN');
  while(q.length<100) push(`추가 SQL ${q.length+1}`,'Book 테이블의 모든 열을 조회하세요.','SELECT * FROM Book;','SELECT 기본');
  q.slice(0,100).forEach(add);
}

function buildJoinAdvanced100(){
  const q=[];
  const push=(title,text,answer,hint)=>q.push(['4단계 조인/종합 SQL 작성',`${q.length+1}. ${title}`,text,'',answer,hint]);
  push('Customer Orders JOIN','Customer와 Orders를 조인해 name, orderid, saleprice를 조회하세요.','SELECT Customer.name, Orders.orderid, Orders.saleprice FROM Customer JOIN Orders ON Customer.custid = Orders.custid;','JOIN ON');
  push('Book Orders JOIN','Book과 Orders를 조인해 bookname, orderid를 조회하세요.','SELECT Book.bookname, Orders.orderid FROM Book JOIN Orders ON Book.bookid = Orders.bookid;','JOIN ON');
  push('3테이블 JOIN','Customer, Orders, Book을 조인해 name, bookname, saleprice를 조회하세요.','SELECT Customer.name, Book.bookname, Orders.saleprice FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid;','3테이블 JOIN');
  push('주문 없는 고객 LEFT','LEFT JOIN으로 주문한 적 없는 고객을 조회하세요.','SELECT Customer.* FROM Customer LEFT JOIN Orders ON Customer.custid = Orders.custid WHERE Orders.orderid IS NULL;','LEFT JOIN + IS NULL');
  push('주문 없는 도서 LEFT','LEFT JOIN으로 주문된 적 없는 도서를 조회하세요.','SELECT Book.* FROM Book LEFT JOIN Orders ON Book.bookid = Orders.bookid WHERE Orders.orderid IS NULL;','LEFT JOIN + IS NULL');
  push('고객별 총액 조인','고객 이름별 총 판매금액을 조회하세요.','SELECT Customer.name, SUM(Orders.saleprice) FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name;','JOIN + GROUP BY');
  push('총액 30000 이상','총 판매금액이 30000 이상인 고객 이름과 총액을 조회하세요.','SELECT Customer.name, SUM(Orders.saleprice) AS 총판매금액 FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name HAVING SUM(Orders.saleprice) >= 30000;','HAVING');
  push('도서별 주문횟수 전체','주문 없는 도서도 포함해 도서별 주문 횟수를 조회하세요.','SELECT Book.bookname, COUNT(Orders.orderid) AS 주문횟수 FROM Book LEFT JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.bookid, Book.bookname;','LEFT JOIN + COUNT');
  push('EXISTS 고객','주문한 적 있는 고객을 EXISTS로 조회하세요.','SELECT * FROM Customer WHERE EXISTS (SELECT * FROM Orders WHERE Orders.custid = Customer.custid);','EXISTS');
  push('NOT EXISTS 고객','주문한 적 없는 고객을 NOT EXISTS로 조회하세요.','SELECT * FROM Customer WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.custid = Customer.custid);','NOT EXISTS');
  push('NOT EXISTS 도서','주문된 적 없는 도서를 NOT EXISTS로 조회하세요.','SELECT * FROM Book WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.bookid = Book.bookid);','NOT EXISTS');
  push('통계 정렬','고객별 주문개수와 총판매금액을 조회하고 총판매금액 내림차순 정렬하세요.','SELECT Customer.name, COUNT(*) AS 주문개수, SUM(Orders.saleprice) AS 총판매금액 FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name ORDER BY 총판매금액 DESC;','JOIN + GROUP BY + ORDER BY');
  push('가장 많이 주문한 고객','주문 개수가 가장 많은 고객 이름과 주문개수를 조회하세요.','SELECT Customer.name, COUNT(*) AS 주문개수 FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name ORDER BY 주문개수 DESC LIMIT 1;','LIMIT 1');
  for(const c of customerRows) push(`${c.name} 주문 도서`,`고객 ${c.name}이 주문한 도서명을 조회하세요.`,`SELECT Book.bookname FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Customer.name = '${c.name}';`,'3테이블 JOIN + WHERE');
  for(const b of bookRows) push(`${b.bookname} 주문 고객`,`도서 ${b.bookname}을 주문한 고객명을 조회하세요.`,`SELECT Customer.name FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Book.bookname = '${b.bookname}';`,'3테이블 JOIN + WHERE');
  for(const pub of uniq(bookRows.map(b=>b.publisher))) push(`${pub} 주문 내역`,`출판사 ${pub}의 도서를 주문한 고객명과 도서명을 조회하세요.`,`SELECT Customer.name, Book.bookname FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Book.publisher = '${pub}';`,'JOIN 후 출판사 조건');
  for(const t of [10000,13000,20000]) push(`판매가 ${t} 이상 조인`,`판매가격이 ${t}원 이상인 주문의 고객명, 도서명, 판매가격을 조회하세요.`,`SELECT Customer.name, Book.bookname, Orders.saleprice FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Orders.saleprice >= ${t};`,'JOIN + WHERE');
  for(const t of [1,2,3]) push(`주문 ${t}개 이상 고객`,`주문 개수가 ${t}개 이상인 고객명과 주문개수를 조회하세요.`,`SELECT Customer.name, COUNT(*) AS 주문개수 FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name HAVING COUNT(*) >= ${t};`,'JOIN + HAVING');
  for(const t of [10000,20000,30000]) push(`총액 ${t} 이상 고객`,`총 판매금액이 ${t}원 이상인 고객명과 총액을 조회하세요.`,`SELECT Customer.name, SUM(Orders.saleprice) AS 총판매금액 FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name HAVING SUM(Orders.saleprice) >= ${t};`,'JOIN + SUM + HAVING');
  while(q.length<100) push(`추가 조인 ${q.length+1}`,'Customer와 Orders를 조인해 name과 orderid를 조회하세요.','SELECT Customer.name, Orders.orderid FROM Customer JOIN Orders ON Customer.custid = Orders.custid;','JOIN ON');
  q.slice(0,100).forEach(add);
}

buildFillBlank100();
buildCodeResult100();
buildSqlWrite100();
buildJoinAdvanced100();

let current = Number(localStorage.getItem('mysqlQuizCurrent') || 0);
if(current >= questions.length) current = 0;
const saved = JSON.parse(localStorage.getItem('mysqlQuizAnswers') || '{}');
const solved = JSON.parse(localStorage.getItem('mysqlQuizSolved') || '{}');

const $ = id => document.getElementById(id);
function normalize(s){return s.toLowerCase().replace(/;\s*$/,'').replace(/\s+/g,' ').trim();}
function getExplanation(q){
  const type=q[0], title=q[1], sql=q[3], ans=q[4], hint=q[5];
  if(type.includes('빈칸')) return `정답: ${ans}\n\n이유: 이 문제는 빈칸형입니다. 빈칸 위치를 먼저 보고 SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY 중 어느 절인지 판단합니다. 핵심 개념: ${hint}`;
  if(type.includes('실행결과')) return `정답: ${ans}\n\n이유: 실제 테이블 값을 기준으로 조건에 맞는 행을 고른 뒤 결과를 계산합니다. WHERE는 행 필터링, DISTINCT는 중복 제거, GROUP BY는 묶음 계산, HAVING은 집계 결과 조건입니다. 핵심 개념: ${hint}`;
  if(type.includes('코드')) return `정답: ${ans}\n\n이유: SQL은 FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY 순서로 생각하면 됩니다. 먼저 사용할 행을 정하고 마지막에 SELECT 결과를 읽습니다. 핵심 개념: ${hint}\n\nSQL:\n${sql}`;
  return `정답 SQL:\n${ans}\n\n이유: 요구사항을 SQL 절로 나누면 됩니다. 조회할 컬럼은 SELECT, 사용할 테이블은 FROM, 조건은 WHERE, 묶음 계산은 GROUP BY, 집계 조건은 HAVING, 정렬은 ORDER BY에 씁니다. 핵심 개념: ${hint}`;
}
function render(){
  const q = questions[current];
  const sectionStart = Math.floor(current / 100) * 100;
  const sectionEnd = Math.min(sectionStart + 99, questions.length - 1);
  const localNum = current - sectionStart + 1;
  $('numBadge').textContent = `${localNum} / 100`;
  $('levelBadge').textContent = q[0];
  $('questionTitle').textContent = q[1];
  $('questionText').textContent = q[2];
  $('templateBox').textContent = q[3] || 'SQL 전체를 직접 작성하세요.';
  $('answerInput').value = saved[current] || '';
  $('feedback').className='feedback'; $('feedback').textContent='';
  $('hintBox').className='hint hidden'; $('hintBox').textContent=q[5];
  $('answerBox').className='answer hidden'; $('answerBox').textContent=getExplanation(q);
  $('prevBtn').disabled = current===sectionStart;
  $('nextBtn').disabled = current===sectionEnd;
  updateProgress(); localStorage.setItem('mysqlQuizCurrent', current);
}
function updateProgress(){
  const count = Object.keys(solved).filter(k=>Number(k)<questions.length).length;
  $('progressText').textContent = `${count} / ${questions.length}`;
  $('progressBar').style.width = `${count/questions.length*100}%`;
}
$('answerInput').addEventListener('input', e=>{saved[current]=e.target.value; localStorage.setItem('mysqlQuizAnswers',JSON.stringify(saved));});
$('checkBtn').onclick=()=>{
  const user=normalize($('answerInput').value);
  const ans=normalize(questions[current][4]);
  const ok=user===ans;
  $('feedback').className='feedback '+(ok?'good':'bad');
  $('feedback').textContent=ok?'정답입니다!':'아직 달라요. 아래 이유를 보고 개념을 확인하세요.';
  $('answerBox').classList.remove('hidden');
  if(ok){ solved[current]=true; localStorage.setItem('mysqlQuizSolved',JSON.stringify(solved)); updateProgress(); }
};
$('hintBtn').onclick=()=>$('hintBox').classList.toggle('hidden');
$('showBtn').onclick=()=>$('answerBox').classList.toggle('hidden');
$('nextBtn').onclick=()=>{
  const sectionEnd = Math.min(Math.floor(current / 100) * 100 + 99, questions.length - 1);
  if(current<sectionEnd){current++;render();}
};
$('prevBtn').onclick=()=>{
  const sectionStart = Math.floor(current / 100) * 100;
  if(current>sectionStart){current--;render();}
};
document.querySelectorAll('.level[data-jump]').forEach(b=>b.onclick=()=>{current=Number(b.dataset.jump);render();});
$('resetBtn').onclick=()=>{if(confirm('진도와 입력 답안을 모두 지울까요?')){localStorage.removeItem('mysqlQuizCurrent');localStorage.removeItem('mysqlQuizAnswers');localStorage.removeItem('mysqlQuizSolved');location.reload();}};
function showQuiz(){ $('quizView').classList.remove('hidden'); $('conceptView').classList.add('hidden'); }
function showConcept(){ $('conceptView').classList.remove('hidden'); $('quizView').classList.add('hidden'); window.scrollTo({top:0, behavior:'smooth'}); }
$('quizViewBtn').onclick=showQuiz;
$('conceptViewBtn').onclick=showConcept;
$('sideConceptBtn').onclick=showConcept;
$('backToQuizBtn').onclick=showQuiz;
$('schemaBtn').onclick=()=>$('schemaDialog').showModal();
$('closeSchema').onclick=()=>$('schemaDialog').close();
render();
