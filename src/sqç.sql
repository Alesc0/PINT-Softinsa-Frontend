DROP TABLE IF EXISTS UTILIZADORES_NOTIFICACOES;

DROP TABLE IF EXISTS NOTIFICACOES;

DROP TABLE IF EXISTS UTILIZADORES_PEDIDOS;

DROP TABLE IF EXISTS PEDIDOS_SALAS;

DROP TABLE IF EXISTS PEDIDOS;

DROP TABLE IF EXISTS RESERVAS_EQUIPAMENTOS;

DROP TABLE IF EXISTS RESERVAS;

DROP TABLE IF EXISTS MANUTENCOES;

DROP TABLE IF EXISTS UTILIZADORES_PERMISSOES;

DROP TABLE IF EXISTS PERMISSOES;

DROP TABLE IF EXISTS EMPREGADOS_MANUTENCOES;

DROP TABLE IF EXISTS EMPREGADOS_LIMPEZA;

DROP TABLE IF EXISTS EQUIPAMENTOS;

DROP TABLE IF EXISTS UTILIZADORES;

DROP TABLE IF EXISTS SALAS;

DROP TABLE IF EXISTS CENTROS;

create table CENTROS(
    IDCENTRO serial primary key,
    NOME text null,
    CIDADE text not null,
    ENDERECO text not null,
    IMAGEM bytea not null,
    DESCRICAO text,
    ESTADO boolean not null default '1'
);

create table SALAS (
    IDSALA serial primary key,
    IDCENTRO int not null references CENTROS (IDCENTRO) ON DELETE CASCADE,
    LOTACAOMAX numeric not null,
    LOTACAO numeric null,
    DESCRICAO text,
    ESTADO boolean not null default '1'
);

create table EQUIPAMENTOS (
    IDEQUIPAMENTO serial primary key,
    IDSALA int not null references SALAS(IDSALA) ON DELETE CASCADE,
    TIPO text not null,
    ESTADO text null,
    ESPECIFICACOES text null
);

create table UTILIZADORES (
    IDUTILIZADOR serial primary key,
    NOME text not null,
    IDCENTRO int not null references CENTROS(IDCENTRO),
    DATANASCIMENTO date not null,
    TELEMOVEL text not null,
    EMAIL text not null,
    PASSWORD text not null,
    ESTADO boolean not null default '0',
    FIRSTLOGIN boolean not null default '1',
    VERIFICADO boolean not null default '0',
    TOKEN text null,
    FOTO bytea null
);

create table NOTIFICACOES(
    IDNOTIFICACAO serial primary key,
    IDUTILIZADOR int null references UTILIZADORES (IDUTILIZADOR),
    TITULO text null,
    DESCRICAO text not null,
    HORA timestamp DEFAULT now(),
    RECEBIDA boolean not null default '1'
);

create table UTILIZADORES_NOTIFICACOES(
    IDUTILIZADOR int not null references UTILIZADORES(IDUTILIZADOR),
    IDNOTIFICACAO int not null references NOTIFICACOES(IDNOTIFICACAO),
    constraint PK_UTILIZADORES_NOTIFICACOES primary key(IDUTILIZADOR, IDNOTIFICACAO)
);

create table FEEDBACKS(
    IDFEEDBACK SERIAL PRIMARY KEY,
    IDUTILIZADOR INT NOT NULL REFERENCES UTILIZADORES(IDUTILIZADOR),
    IDSALA INT NULL REFERENCES SALAS(IDSALA),
    IDCENTRO INT NULL REFERENCES CENTROS(IDCENTRO),
    COMENTARIO TEXT NOT NULL,
    CRIADO_EM timestamp NOT NULL DEFAULT(now)
);

create table EMPREGADOS_LIMPEZA (DISPONIBILIDADE boolean not null) inherits (UTILIZADORES);

create table EMPREGADOS_MANUTENCOES (
    ESPECIALIDADE text not null,
    DISPONIBILIDADE boolean not null
) inherits (UTILIZADORES);

create table PERMISSOES (
    IDPERMISSAO int not null primary key,
    PERMISSAO text not null
);

create table UTILIZADORES_PERMISSOES (
    IDUTILIZADOR int not null references UTILIZADORES(IDUTILIZADOR),
    IDPERMISSAO int not null references PERMISSOES(IDPERMISSAO),
    constraint PK_UTILIZADORESPERMISSOES primary key(IDUTILIZADOR, IDPERMISSAO)
);

create table MANUTENCOES (
    IDMANUTENCAO serial primary key,
    IDSALA int not null references SALAS(IDSALA),
    IDUTILIZADOR int not null references utilizadores(idutilizador),
    TIPOPROBLEMA text not null,
    DESCRICAO text not null
);

create table RESERVAS (
    IDRESERVA serial primary key,
    IDSALA int not null references SALAS(IDSALA),
    IDUTILIZADOR int not null references utilizadores(idutilizador),
    DATA date not null,
    HORAINICIO time not null,
    HORAFINAL time not null,
    Observacoes text
);

create table RESERVAS_EQUIPAMENTOS (
    IDRESERVA int not null references RESERVAS(IDRESERVA),
    IDEQUIPAMENTO int not null references EQUIPAMENTOS(IDEQUIPAMENTO),
    constraint PK_RESERVAS_EQUIPAMENTOS primary key (IDRESERVA, IDEQUIPAMENTO)
);

create table PEDIDOS (
    IDPEDIDO serial primary key,
    DURACAOMAX time null,
    TIPOLIMPEZA text null,
    URGENCIA boolean not null,
    DESCRICAO text
);

create table PEDIDOS_SALAS (
    IDPEDIDO int not null references PEDIDOS(IDPEDIDO),
    IDSALA int not null references SALAS(IDSALA),
    constraint PK_PEDIDOS_SALAS primary key (IDPEDIDO, IDSALA)
);

create table UTILIZADORES_PEDIDOS (
    IDUTILIZADOR int not null references UTILIZADORES(IDUTILIZADOR),
    IDPEDIDO int not null references PEDIDOS(IDPEDIDO),
    constraint PK_UTILIZADORES_PEDIDOS primary key (IDUTILIZADOR, IDPEDIDO)
);

/*==============================================================*/
/*                      INSERTS                                 */
/*==============================================================*/
insert into
    CENTROS(nome, cidade, endereco, imagem, descricao)
values
    (
        'Centro de Viseu',
        'Viseu',
        'Zona Ind. Coimbrões, 16, 3500-618 Viseu',
        'i',
        'Centro de Viseu'
    );

insert into
    empregados_limpeza (
        nome,
        idcentro,
        datanascimento,
        telemovel,
        email,
        password,
        disponibilidade
    )
values
    (
        'joao',
        1,
        '2003-02-10',
        '913232512',
        'joao@gmail.com',
        123123,
        '1'
    ),
    (
        'andre',
        1,
        '2000-02-10',
        '913233512',
        'andre@gmail.com',
        123123,
        '1'
    ),
    (
        'joaquim',
        1,
        '1996-08-12',
        '933233512',
        'joaquim@gmail.com',
        123123,
        '1'
    );