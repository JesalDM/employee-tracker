// creates class Role that acts like a model object for a record in the role table
class Role{
    constructor(title, salary, department_id){
        this.title = title;
        this.salary = salary;
        this.department_id = department_id
    }
}

module.exports = Role;