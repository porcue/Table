document.addEventListener('DOMContentLoaded', () => {
  const studentName = document.querySelector('.name');
  const studentSurname = document.querySelector('.surname');
  const studentMiddlename = document.querySelector('.middle__name');
  const birthDate = document.querySelector('.birth__date');
  const studyYear = document.querySelector('.year');
  const department = document.querySelector('.department');
  const button = document.querySelector('.button');
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');
  const error = document.querySelector('.error');
  const inputs = document.querySelectorAll('.student');
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const milliDay = 1000 * 60 * 60 * 24;
  const tooltipOne = document.querySelector('.tooltip-one');
  const tooltipTwo = document.querySelector('.tooltip-two');
  const filterWrapper = document.querySelector('.filter__container');
  const filterName = document.querySelector('.filter__name');
  const filterDepartment = document.querySelector('.filter__department');
  const filterYear = document.querySelector('.filter__year');
  table.classList.add('table');
  let th1;
  let th2;
  let th3;
  let th4;
  let arr;
  let task;

  if (localStorage.getItem('students') !== null) {
    arr = JSON.parse(localStorage.getItem('students'));
  } else {
    arr = [];
  }

  function validateYear() {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      if (studyYear.value < 2000 || studyYear.value > date.getFullYear()) {
        button.disabled = true;
        studyYear.classList.add('test');
        tooltipTwo.classList.add('active');
      } else {
        button.disabled = false;
        studyYear.classList.remove('test');
        tooltipTwo.classList.remove('active');
      }
    }, 2000);
  }
  studyYear.addEventListener('input', validateYear);

  function validateBirth() {
    const birth = new Date(birthDate.value);
    const birthYear = birth.getFullYear();
    if (birthYear < 1900 || birthYear > date.getFullYear()) {
      button.disabled = true;
      birthDate.classList.add('test');
      tooltipOne.classList.add('active');
    } else {
      button.disabled = false;
      birthDate.classList.remove('test');
      tooltipOne.classList.remove('active');
    }
  }
  birthDate.addEventListener('change', validateBirth);

  function validateForm() {
    inputs.forEach((el) => {
      if (!el.value.trim()) {
        error.classList.add('active');
        button.removeEventListener('click', createStudent);
      } else {
        button.addEventListener('click', createStudent);
      }
    });
  }

  function filterStudentName() {
    const array = Array.from(tableBody.children);
    array.filter((el) => {
      if (el.children[0].textContent.search(filterName.value) == -1) {
        el.classList.add('hide');
      } else {
        el.classList.remove('hide');
      }
    });
  }

  function filterStudentDepartment() {
    const array = Array.from(tableBody.children);
    array.filter((el) => {
      if (el.children[1].textContent.search(filterDepartment.value) == -1) {
        el.classList.add('hide');
      } else {
        el.classList.remove('hide');
      }
    });
  }

  function filterStudentYears() {
    const array = Array.from(tableBody.children);
    array.filter((el) => {
      if (+el.children[3].textContent.search(filterYear.value) == -1) {
        el.classList.add('hide');
      } else {
        el.classList.remove('hide');
      }
    });
  }

  function sortName() {
    const array = Array.from(tableBody.children);
    array.sort((a, b) => ((a.children[0].textContent <= b.children[0].textContent) ? -1 : 1));
    tableBody.innerHTML = '';
    array.forEach((el) => {
      tableBody.append(el);
    });
  }

  function sortDepartment() {
    const array = Array.from(tableBody.children);
    array.sort((a, b) => ((a.children[1].textContent <= b.children[1].textContent) ? -1 : 1));
    tableBody.innerHTML = '';
    array.forEach((el) => {
      tableBody.append(el);
    });
  }

  function sortBirth() {
    const array = Array.from(tableBody.children);
    array.sort((a, b) => ((a.children[2].getAttribute('data') <= b.children[2].getAttribute('data')) ? -1 : 1));
    tableBody.innerHTML = '';
    array.forEach((el) => {
      tableBody.append(el);
    });
  }

  function sortYear() {
    const array = Array.from(tableBody.children);
    array.sort((a, b) => ((parseInt(a.children[3].textContent) <= parseInt(b.children[3].textContent)) ? -1 : 1));
    tableBody.innerHTML = '';
    array.forEach((el) => {
      tableBody.append(el);
    });
  }

  function dataOfStudent(name, depart, birth, year) {
    const tr2 = document.createElement('tr');
    tr2.classList.add('new');
    const td1 = document.createElement('td');
    td1.classList.add('h');
    td1.textContent = name;
    const td2 = document.createElement('td');
    td2.classList.add('h');
    td2.classList.add('departments');
    td2.textContent = depart;
    const td3 = document.createElement('td');
    td3.setAttribute('data', birthDate.value);
    td3.classList.add('h');
    td3.textContent = birth;
    const td4 = document.createElement('td');
    td4.classList.add('h');
    td4.textContent = year;
    tr2.append(td1, td2, td3, td4);
    return {
      tr2,
      td1,
      td2,
      td3,
      td4,
    };
  }

  (function createTable() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    th1 = document.createElement('th');
    th1.textContent = '?????? ????????????????';
    th2 = document.createElement('th');
    th2.textContent = '??????????????????';
    th3 = document.createElement('th');
    th3.textContent = '???????? ???????????????? ?? ??????????????';
    th4 = document.createElement('th');
    th4.textContent = '???????? ???????????????? ?? ?????????? ??????????';
    tr.append(th1, th2, th3, th4);
    thead.append(tr);
    table.append(thead);
    table.append(tableBody);
    document.body.append(table);
  }());

  function createStudent() {
    th1.addEventListener('click', sortName);
    th2.addEventListener('click', sortDepartment);
    th3.addEventListener('click', sortBirth);
    th4.addEventListener('click', sortYear);

    error.classList.remove('active');
    filterWrapper.classList.add('appear');
    const studentDate = new Date(birthDate.value);
    const studentYear = studentDate.getFullYear();
    const studentDay = studentDate.getDate();
    const studentMonth = studentDate.getMonth() + 1;
    let validMonth = studentMonth;
    const ageInDays = (date - studentDate) / milliDay;

    if (validMonth < 10) {
      validMonth = `0${studentMonth}`;
    } else {
      validMonth = studentMonth;
    }

    let finish = `${date.getFullYear() - studyYear.value} ????????`;

    if ((+studyYear.value + 4) < date.getFullYear()) {
      finish = '????????????????/a ????????????????';
    }
    const student = {
      name: `${studentSurname.value} ${studentName.value} ${studentMiddlename.value}`,
      birth: `${studentDay}.${validMonth}.${studentYear} (${Math.floor(ageInDays / 365)} ??????)`,
      year: `${studyYear.value}-${+studyYear.value + 4} (${finish})`,
      department: department.value,
    };

    arr.push(student);
    localStorage.setItem('students', JSON.stringify(arr));

    arr.forEach((el) => {
      task = dataOfStudent(el.name, el.department, el.birth, el.year).tr2;
      localStorage.setItem('students', JSON.stringify(arr));
    });

    tableBody.append(task);

    const values = document.querySelectorAll('input');
    values.forEach((el) => {
      el.value = '';
    });
  }

  button.addEventListener('click', validateForm);
  filterName.addEventListener('input', filterStudentName);
  filterDepartment.addEventListener('input', filterStudentDepartment);
  filterYear.addEventListener('input', filterStudentYears);

  (function getStorage() {
    if (arr.length > 0) {
      document.body.append(filterWrapper, table);
      filterWrapper.classList.add('appear');
      arr.forEach((element) => {
        const showStorage = dataOfStudent(element.name, element.department, element.birth, element.year).tr2;
        tableBody.append(showStorage);
        th1.addEventListener('click', sortName);
        th2.addEventListener('click', sortDepartment);
        th3.addEventListener('click', sortBirth);
        th4.addEventListener('click', sortYear);
        filterName.addEventListener('input', filterStudentName);
        filterDepartment.addEventListener('input', filterStudentDepartment);
        filterYear.addEventListener('input', filterStudentYears);
      });
    }
  }());
});
