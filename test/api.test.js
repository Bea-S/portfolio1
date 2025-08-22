const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;
chai.use(chaiHttp);

let patientId, doctorId, appointmentId;

describe('API Consultório Médico', () => {
  // Pacientes
  it('POST /patients - deve criar paciente', done => {
    chai.request(app)
      .post('/patients')
      .send({ name: 'João', birthDate: '1990-01-01', phone: '123456789' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        patientId = res.body.id;
        done();
      });
  });

  it('GET /patients - deve listar pacientes', done => {
    chai.request(app)
      .get('/patients')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('PUT /patients/:id - deve atualizar paciente', done => {
    chai.request(app)
      .put(`/patients/${patientId}`)
      .send({ name: 'João Silva' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal('João Silva');
        done();
      });
  });

  it('DELETE /patients/:id - deve remover paciente', done => {
    chai.request(app)
      .delete(`/patients/${patientId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  // Médicos
  it('POST /doctors - deve criar médico', done => {
    chai.request(app)
      .post('/doctors')
      .send({ name: 'Dra. Ana', specialty: 'Cardiologia', phone: '987654321' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        doctorId = res.body.id;
        done();
      });
  });

  it('GET /doctors - deve listar médicos', done => {
    chai.request(app)
      .get('/doctors')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('PUT /doctors/:id - deve atualizar médico', done => {
    chai.request(app)
      .put(`/doctors/${doctorId}`)
      .send({ name: 'Dra. Ana Paula' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal('Dra. Ana Paula');
        done();
      });
  });

  it('DELETE /doctors/:id - deve remover médico', done => {
    chai.request(app)
      .delete(`/doctors/${doctorId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  // Agendamentos
  it('POST /appointments - deve criar agendamento', done => {
    // Precisa de paciente e médico válidos
    chai.request(app)
      .post('/patients')
      .send({ name: 'Maria', birthDate: '1985-05-05', phone: '111222333' })
      .end((err, res) => {
        const pId = res.body.id;
        chai.request(app)
          .post('/doctors')
          .send({ name: 'Dr. Carlos', specialty: 'Ortopedia', phone: '444555666' })
          .end((err2, res2) => {
            const dId = res2.body.id;
            chai.request(app)
              .post('/appointments')
              .send({ patientId: pId, doctorId: dId, date: '2025-09-01', reason: 'Consulta de rotina' })
              .end((err3, res3) => {
                expect(res3).to.have.status(201);
                expect(res3.body).to.have.property('id');
                appointmentId = res3.body.id;
                done();
              });
          });
      });
  });

  it('GET /appointments - deve listar agendamentos', done => {
    chai.request(app)
      .get('/appointments')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('PUT /appointments/:id - deve atualizar agendamento', done => {
    chai.request(app)
      .put(`/appointments/${appointmentId}`)
      .send({ reason: 'Retorno' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.reason).to.equal('Retorno');
        done();
      });
  });

  it('DELETE /appointments/:id - deve remover agendamento', done => {
    chai.request(app)
      .delete(`/appointments/${appointmentId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});
