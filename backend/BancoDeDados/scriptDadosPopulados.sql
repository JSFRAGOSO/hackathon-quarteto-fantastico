-- Database: machineworkflow

INSERT INTO limits VALUES (001,10,50,'Temperatura','°C');
INSERT INTO limits VALUES (005,5,115,'Vibração','MHz');

INSERT INTO limits VALUES (004,10,45,'Temperatura','°C');
INSERT INTO limits VALUES (002,1,100,'Vibração','MHz');
INSERT INTO limits VALUES (003,30,60,'nº ciclos','Ciclos/minuto');

INSERT INTO machine VALUES (1001,2323,'Torno Mecânico','2001-12-21') ;
INSERT INTO machine VALUES (1002,2332,'Torno CNC','2010-08-13');
INSERT INTO machine VALUES (1003,2333,'Fresadora CNC','2009-06-21');
INSERT INTO machine VALUES (1004,2334,'Afiadora CNC','2010-08-14');

INSERT INTO machine_limits VALUES (1001,001,'Desnecessário');
INSERT INTO machine_limits VALUES (1001,005,'Realizar manutenção preventiva, localizando a real origem do alto nivel de vibração, verificar fixação de componentes e carenagens da máquina (internos ou externos).');
INSERT INTO machine_limits VALUES (1001,003,'Desmecessário');

INSERT INTO machine_limits VALUES (1002,002,'Verificar fixação de todos os componentes internos na maquina (sendo eles carenagens, ferramenas, dispositivos internos de usinagem). ');
INSERT INTO machine_limits VALUES (1002,003,'Revisão no código de programação da máquina, reajuste dos parâmetros inseridos. ');
INSERT INTO machine_limits VALUES (1002,004,'Desmecessário');

INSERT INTO machine_limits VALUES (1003,002,'Desmecessário');
INSERT INTO machine_limits VALUES (1003,004,'Verificar refrigeração, verificar possiveis vazamentos de fluidos lubrificantes, executar a reposição assim que possivel. ');
INSERT INTO machine_limits VALUES (1003,003,'Desmecessário');

INSERT INTO machine_limits VALUES (1004,004,'Desmecessário');
INSERT INTO machine_limits VALUES (1004,002,'Verificar fixação de todos os componentes internos na maquina (sendo eles discos de corte, rebolos, a própria ferramenta e qualquer outro dispositivo do processo de afiação ). ');
INSERT INTO machine_limits VALUES (1004,003,'Desmecessário');