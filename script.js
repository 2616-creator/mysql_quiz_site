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
  const push=(title,text,template,answer,hint)=>q.push(['1단계 기본 빈칸 10문제',`${q.length+1}. ${title}`,text,template,answer,hint]);
  push('전체 도서 조회','Book 테이블의 모든 열을 조회하도록 빈칸을 채우세요.','SELECT ____ FROM Book;','*','*는 모든 열을 뜻합니다.');
  push('특정 열 조회','Book 테이블에서 도서명만 조회하세요.','SELECT ____ FROM Book;','bookname','SELECT 뒤에는 조회할 열 이름을 씁니다.');
  push('조건절 위치','가격이 10000원 이상인 도서만 고르려면 어떤 절이 필요할까요?','SELECT * FROM Book ____ price >= 10000;','WHERE','WHERE는 행을 걸러내는 조건절입니다.');
  push('문자 조건','출판사가 굿스포츠인 도서를 찾도록 값을 채우세요.','SELECT * FROM Book WHERE publisher = ____;','\'굿스포츠\'','문자열은 따옴표로 감쌉니다.');
  push('포함 검색','도서명에 축구가 포함되도록 LIKE 패턴을 쓰세요.','SELECT * FROM Book WHERE bookname LIKE ____;','\'%축구%\'','%는 앞뒤로 글자가 더 있어도 된다는 뜻입니다.');
  push('중복 제거','출판사 목록을 중복 없이 보려면 어떤 키워드를 쓸까요?','SELECT ____ publisher FROM Book;','DISTINCT','DISTINCT는 중복 값을 제거합니다.');
  push('정렬','가격이 높은 도서부터 보려면 정렬 방향을 채우세요.','SELECT * FROM Book ORDER BY price ____;','DESC','DESC는 내림차순입니다.');
  push('NULL 비교','전화번호가 없는 고객을 찾는 조건을 완성하세요.','SELECT * FROM Customer WHERE phone ____ NULL;','IS','NULL은 =가 아니라 IS NULL로 비교합니다.');
  push('집계 함수','주문 전체 판매금액 합계를 구하는 함수를 쓰세요.','SELECT ____(saleprice) FROM Orders;','SUM','SUM은 합계를 구하는 집계 함수입니다.');
  push('묶기','고객별 주문 수를 구하려면 고객번호로 묶어야 합니다.','SELECT custid, COUNT(*) FROM Orders ____ custid;','GROUP BY','GROUP BY는 같은 값끼리 묶어 집계합니다.');
  q.forEach(add);
}

function buildCodeResult100(){
  const q=[];
  const push=(title,sql,answer,hint)=>q.push(['2단계 결과 해석 10문제',`${q.length+1}. ${title}`,'다음 SQL의 실행결과를 쓰세요.',sql,String(answer),hint]);
  push('전체 도서 수','SELECT COUNT(*) FROM Book;',10,'Book 테이블에는 10행이 있습니다.');
  push('최저 도서 가격','SELECT MIN(price) FROM Book;',6000,'price 중 가장 작은 값입니다.');
  push('굿스포츠 도서 수',"SELECT COUNT(*) FROM Book WHERE publisher = '굿스포츠';",3,'조건에 맞는 행만 센 뒤 COUNT합니다.');
  push('축구 포함 도서',"SELECT bookname FROM Book WHERE bookname LIKE '%축구%';",'축구의 역사, 축구 아는 여자, 축구의 이해','LIKE %축구%는 도서명 안에 축구가 있는 행입니다.');
  push('가격 13000 이상 수','SELECT COUNT(*) FROM Book WHERE price >= 13000;',6,'비교 조건을 만족하는 도서 수입니다.');
  push('전체 주문 합계','SELECT SUM(saleprice) FROM Orders;',118000,'Orders.saleprice 전체 합계입니다.');
  push('박지성 주문 수','SELECT COUNT(*) FROM Orders WHERE custid = 1;',3,'박지성의 custid는 1입니다.');
  push('주문 고객 종류 수','SELECT COUNT(DISTINCT custid) FROM Orders;',4,'주문한 고객번호의 중복을 제거합니다.');
  push('2번 이상 주문 고객','SELECT custid FROM Orders GROUP BY custid HAVING COUNT(*) >= 2;','1, 2, 3, 4','GROUP BY 후 HAVING으로 주문 수 조건을 적용합니다.');
  push('주문 없는 고객',"SELECT name FROM Customer WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.custid = Customer.custid);",'박세리','Orders에 같은 custid가 없는 고객입니다.');
  q.forEach(add);
}

function buildSqlWrite100(){
  const q=[];
  const push=(title,text,answer,hint)=>q.push(['3단계 SQL 작성 10문제',`${q.length+1}. ${title}`,text,'',answer,hint]);
  push('도서명과 가격','Book에서 bookname, price만 조회하세요.','SELECT bookname, price FROM Book;','필요한 열만 SELECT에 나열합니다.');
  push('비교 조건','가격이 20000원 이상인 도서를 조회하세요.','SELECT * FROM Book WHERE price >= 20000;','숫자 비교는 WHERE에서 합니다.');
  push('문자 조건','이상미디어 출판사의 도서를 조회하세요.','SELECT * FROM Book WHERE publisher = \'이상미디어\';','문자열 값은 따옴표로 감쌉니다.');
  push('패턴 검색','이름이 박으로 시작하는 고객을 조회하세요.','SELECT * FROM Customer WHERE name LIKE \'박%\';','시작 조건은 글자% 패턴입니다.');
  push('범위 조건','가격이 10000원 이상 20000원 이하인 도서를 조회하세요.','SELECT * FROM Book WHERE price BETWEEN 10000 AND 20000;','BETWEEN A AND B는 A 이상 B 이하입니다.');
  push('중복 없는 목록','Book에서 출판사를 중복 없이 조회하세요.','SELECT DISTINCT publisher FROM Book;','DISTINCT는 SELECT 바로 뒤에 씁니다.');
  push('정렬 활용','Orders를 판매가격이 높은 순서로 조회하세요.','SELECT * FROM Orders ORDER BY saleprice DESC;','ORDER BY 컬럼 DESC를 사용합니다.');
  push('고객별 총액','고객번호별 총 판매금액을 조회하세요.','SELECT custid, SUM(saleprice) FROM Orders GROUP BY custid;','집계하지 않은 custid는 GROUP BY에 포함합니다.');
  push('집계 조건','총 판매금액이 30000원 이상인 고객번호를 조회하세요.','SELECT custid, SUM(saleprice) FROM Orders GROUP BY custid HAVING SUM(saleprice) >= 30000;','집계 결과 조건은 HAVING입니다.');
  push('NULL 조건','전화번호가 NULL인 고객을 조회하세요.','SELECT * FROM Customer WHERE phone IS NULL;','NULL은 IS NULL로 찾습니다.');
  q.forEach(add);
}

function buildJoinAdvanced100(){
  const q=[];
  const push=(title,text,answer,hint)=>q.push(['4단계 조인/종합 활용 10문제',`${q.length+1}. ${title}`,text,'',answer,hint]);
  push('고객과 주문 연결','Customer와 Orders를 조인해 고객명과 주문번호를 조회하세요.','SELECT Customer.name, Orders.orderid FROM Customer JOIN Orders ON Customer.custid = Orders.custid;','두 테이블의 공통 기준 custid를 ON에 씁니다.');
  push('도서와 주문 연결','Book과 Orders를 조인해 도서명과 판매가격을 조회하세요.','SELECT Book.bookname, Orders.saleprice FROM Book JOIN Orders ON Book.bookid = Orders.bookid;','bookid가 같은 행끼리 연결합니다.');
  push('3테이블 활용','고객명, 도서명, 판매가격을 함께 조회하세요.','SELECT Customer.name, Book.bookname, Orders.saleprice FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid;','Customer-Orders-Book 순서로 연결합니다.');
  push('특정 고객 주문 도서','박지성이 주문한 도서명을 조회하세요.','SELECT Book.bookname FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Customer.name = \'박지성\';','조인 후 고객명 조건을 추가합니다.');
  push('특정 출판사 주문 고객','굿스포츠 도서를 주문한 고객명과 도서명을 조회하세요.','SELECT Customer.name, Book.bookname FROM Customer JOIN Orders ON Customer.custid = Orders.custid JOIN Book ON Orders.bookid = Book.bookid WHERE Book.publisher = \'굿스포츠\';','조인 결과에서 Book.publisher로 필터링합니다.');
  push('주문 없는 고객','LEFT JOIN으로 주문한 적 없는 고객을 조회하세요.','SELECT Customer.* FROM Customer LEFT JOIN Orders ON Customer.custid = Orders.custid WHERE Orders.orderid IS NULL;','LEFT JOIN 후 오른쪽 주문번호가 NULL인 행입니다.');
  push('도서별 주문 횟수 전체','주문 없는 도서도 포함해 도서별 주문 횟수를 조회하세요.','SELECT Book.bookname, COUNT(Orders.orderid) FROM Book LEFT JOIN Orders ON Book.bookid = Orders.bookid GROUP BY Book.bookid, Book.bookname;','주문 없는 도서까지 보려면 Book을 왼쪽에 둡니다.');
  push('고객별 총액 이름으로','고객 이름별 총 판매금액을 조회하세요.','SELECT Customer.name, SUM(Orders.saleprice) FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name;','이름을 보여주려면 Customer와 조인합니다.');
  push('총액 조건과 정렬','총 판매금액이 30000원 이상인 고객명과 총액을 총액 내림차순으로 조회하세요.','SELECT Customer.name, SUM(Orders.saleprice) AS total FROM Customer JOIN Orders ON Customer.custid = Orders.custid GROUP BY Customer.custid, Customer.name HAVING SUM(Orders.saleprice) >= 30000 ORDER BY total DESC;','GROUP BY, HAVING, ORDER BY를 함께 활용합니다.');
  push('주문 없는 도서 서브쿼리','NOT EXISTS로 주문된 적 없는 도서를 조회하세요.','SELECT * FROM Book WHERE NOT EXISTS (SELECT * FROM Orders WHERE Orders.bookid = Book.bookid);','서브쿼리 결과가 존재하지 않는 Book 행을 찾습니다.');
  q.forEach(add);
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
function getExplanation(q){
  const type=q[0], title=q[1], sql=q[3], ans=q[4], hint=q[5];
  if(type.includes('빈칸')) return `정답: ${ans}\n\n이유: 이 문제는 빈칸형입니다. 빈칸 위치를 먼저 보고 SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY 중 어느 절인지 판단합니다. 핵심 개념: ${hint}`;
  if(type.includes('실행결과') || type.includes('결과')) return `정답: ${ans}\n\n이유: 실제 테이블 값을 기준으로 조건에 맞는 행을 고른 뒤 결과를 계산합니다. WHERE는 행 필터링, DISTINCT는 중복 제거, GROUP BY는 묶음 계산, HAVING은 집계 결과 조건입니다. 핵심 개념: ${hint}\n\nSQL:\n${sql}`;
  if(type.includes('코드')) return `정답: ${ans}\n\n이유: SQL은 FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY 순서로 생각하면 됩니다. 먼저 사용할 행을 정하고 마지막에 SELECT 결과를 읽습니다. 핵심 개념: ${hint}\n\nSQL:\n${sql}`;
  return `정답 SQL:\n${ans}\n\n이유: 요구사항을 SQL 절로 나누면 됩니다. 조회할 컬럼은 SELECT, 사용할 테이블은 FROM, 조건은 WHERE, 묶음 계산은 GROUP BY, 집계 조건은 HAVING, 정렬은 ORDER BY에 씁니다. 핵심 개념: ${hint}`;
}
function render(){
  const q = questions[current];
  const sectionStart = Math.floor(current / 10) * 10;
  const sectionEnd = Math.min(sectionStart + 9, questions.length - 1);
  const localNum = current - sectionStart + 1;
  $('numBadge').textContent = `${localNum} / 10`;
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
  const sectionEnd = Math.min(Math.floor(current / 10) * 10 + 9, questions.length - 1);
  if(current<sectionEnd){current++;render();}
};
$('prevBtn').onclick=()=>{
  const sectionStart = Math.floor(current / 10) * 10;
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
$('schemaBtn').onclick=openSchemaPanel;
$('closeSchemaPanel').onclick=closeSchemaPanel;
$('closeSchema').onclick=()=>$('schemaDialog').close();
renderSchemaPanel();
render();
