/* CazéTV — Loja & Hub (conceito) — main.js */

(function() {
  var RM = false;
  // progress + sticky nav
  var prog = document.getElementById('prog'),
    hd = document.getElementById('hd');

  function onScroll() {
    var h = document.documentElement,
      sc = h.scrollTop,
      max = h.scrollHeight - h.clientHeight;
    prog.style.width = (max > 0 ? (sc / max * 100) : 0) + '%';
    hd.classList.toggle('small', sc > 40);
  }
  addEventListener('scroll', onScroll, {
    passive: true
  });
  onScroll();
  // mobile menu
  var bg = document.getElementById('burger'),
    mm = document.getElementById('mobmenu');
  bg.addEventListener('click', function() {
    mm.classList.toggle('open')
  });
  mm.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      mm.classList.remove('open')
    })
  });
  // reveal
  var io = new IntersectionObserver(function(es) {
    es.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target)
      }
    })
  }, {
    threshold: .14
  });
  document.querySelectorAll('.reveal').forEach(function(el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 4) * 60) + 'ms';
    io.observe(el)
  });
  // count-up
  function animCount(el) {
    var target = parseFloat(el.getAttribute('data-count')),
      suf = el.getAttribute('data-suf') || '',
      dur = 1400,
      t0 = null;

    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var val = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = val + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var cio = new IntersectionObserver(function(es) {
    es.forEach(function(e) {
      if (e.isIntersecting) {
        if (RM) {
          e.target.textContent = e.target.getAttribute('data-count') + (e.target.getAttribute('data-suf') || '');
        } else animCount(e.target);
        cio.unobserve(e.target);
      }
    })
  }, {
    threshold: .5
  });
  document.querySelectorAll('[data-count]').forEach(function(el) {
    cio.observe(el)
  });
  // tilt
  if (!RM) {
    document.querySelectorAll('[data-tilt]').forEach(function(card) {
      card.addEventListener('pointermove', function(e) {
        var r = card.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - .5,
          y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function() {
        card.style.transform = ''
      });
    });
  }
  // ghost parallax
  if (!RM) {
    var ghost = document.querySelector('.ghost .g');
    addEventListener('scroll', function() {
      if (ghost) ghost.style.transform = 'translateX(' + (-scrollY * 0.15) + 'px)';
    }, {
      passive: true
    });
  }
  // confetti
  var cv = document.getElementById('confetti'),
    ctx = cv.getContext('2d'),
    parts = [],
    raf = null;

  function size() {
    cv.width = innerWidth;
    cv.height = innerHeight;
  }
  size();
  addEventListener('resize', size);
  var COL = ['#F2B705', '#00A94F', '#1E40C0', '#ffffff'];

  function burst(x, y) {
    for (var i = 0; i < 80; i++) {
      parts.push({
        x: x,
        y: y,
        vx: (Math.random() - .5) * 11,
        vy: Math.random() * -11 - 3,
        g: .32,
        life: 70 + Math.random() * 30,
        c: COL[i % 4],
        s: 4 + Math.random() * 5,
        rot: Math.random() * 6
      });
    }
    if (!raf) tick();
  }

  function tick() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(function(p) {
      return p.life > 0
    });
    parts.forEach(function(p) {
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.rot += .2;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = Math.max(p.life / 40, 0);
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .5);
      ctx.restore();
    });
    if (parts.length) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
      ctx.clearRect(0, 0, cv.width, cv.height);
    }
  }
  // notify
  var nf = document.getElementById('notifyForm'),
    ni = document.getElementById('notifyInput'),
    nm = document.getElementById('notifyMsg');
  nf.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!ni.value.trim()) return;
    nm.textContent = '✓ Fechou! Te avisamos no próximo drop. Meteu essa? (demo)';
    if (!RM) {
      var b = nf.getBoundingClientRect();
      burst(b.left + b.width / 2, b.top + b.height / 2);
    }
    ni.value = '';
  });
})();


var BIOS = {
  "casimiro": {
    "n": "Casimiro",
    "r": "Fundador",
    "img": "https://assets.goal.com/images/v3/bltb32b34d1ee9e4496/casimiro_copa_2022_2.jpg",
    "acc": "pC",
    "ini": "CA",
    "d": {
      "pt": "A alma da Cazé. “Meteu essa?”",
      "en": "The soul of Cazé. “Meteu essa?”",
      "es": "El alma de Cazé. “Meteu essa?”"
    },
    "b": {
      "pt": "De estagiário do Esporte Interativo, em 2014, a maior fenômeno da internet brasileira. Na pandemia, transformou as lives de reação a jogos na Twitch num movimento — o jeitão humilde, sincero e engraçado fez o país inteiro se identificar. Em 2022 fundou a CazéTV com a LiveMode e passou a bater de frente com a TV aberta na audiência da Copa. Hoje toca CazéTV, Cortes do Casimiro e Que Papinho!, e virou a cara do esporte no digital.",
      "en": "From an Esporte Interativo intern in 2014 to Brazil's biggest internet phenomenon. During the pandemic his Twitch watch-alongs became a movement, and in 2022 he founded CazéTV with LiveMode, rivaling broadcast TV on World Cup audiences.",
      "es": "De becario de Esporte Interativo en 2014 al mayor fenómeno de internet de Brasil. En la pandemia sus lives de reacción en Twitch se volvieron un movimiento, y en 2022 fundó CazéTV con LiveMode, rivalizando con la TV abierta en audiencia del Mundial."
    }
  },
  "lff": {
    "n": "Luís Felipe Freitas",
    "r": "Narrador",
    "img": "https://assets.goal.com/images/v3/blt287c4b8d668c5cfb/lff.jpg",
    "acc": "pL",
    "ini": "LF",
    "d": {
      "pt": "A voz dos gols. Narrador nº1.",
      "en": "The voice of the goals. Announcer #1.",
      "es": "La voz de los goles. Narrador nº1."
    },
    "b": {
      "pt": "O dono da voz dos gols da Cazé. Publicitário de formação, estreou em 2009 no Esporte Interativo (que virou TNT Sports) e narrou por mais de uma década na TV. Em novembro de 2022 topou a aposta e saiu para narrar a Copa do Catar pela CazéTV — deu tão certo que virou o narrador nº1 da casa, das Olimpíadas ao Mundial de Clubes.",
      "en": "CazéTV's play-by-play voice. A former TNT Sports announcer, he debuted in 2009 at Esporte Interativo and left in 2022 to call the World Cup on CazéTV — becoming the channel's #1 announcer.",
      "es": "La voz de los goles de CazéTV. Ex-TNT Sports, debutó en 2009 en Esporte Interativo y en 2022 salió para narrar el Mundial en CazéTV, convirtiéndose en el narrador nº1 de la casa."
    }
  },
  "raony": {
    "n": "Raony Pacheco",
    "r": "Narrador",
    "img": "https://assets.goal.com/images/v3/blt60dde8eb5a4d1ddf/crop/MM5DOMRQHI2DANJ2NZXXOZJ2G44DUNZZ/GHXouiIWMAA79hO.jpeg",
    "acc": "pL",
    "ini": "RP",
    "d": {
      "pt": "Voz de Brasileirão e Cazé.",
      "en": "Voice of Brasileirão and Cazé.",
      "es": "Voz del Brasileirão y de Cazé."
    },
    "b": {
      "pt": "Uma das vozes que dão o tom das transmissões da CazéTV. Além de narrar na Cazé, empresta o grito de gol ao BrasileirãoPlay, transitando entre os grandes jogos do futebol nacional.",
      "en": "One of CazéTV's key voices, he also calls games for BrasileirãoPlay, moving between the biggest matches in Brazilian football.",
      "es": "Una de las voces clave de CazéTV, también narra para BrasileirãoPlay, entre los grandes partidos del fútbol brasileño."
    }
  },
  "nardini": {
    "n": "Fernando Nardini",
    "r": "Narrador",
    "img": "https://assets.goal.com/images/v3/bltd06e85f37651f6ba/crop/MM5DOMBRHIZTSNB2NZXXOZJ2GA5DEMQ=/images%20(1).jpg",
    "acc": "pL",
    "ini": "FN",
    "d": {
      "pt": "Grito de gol ex-ESPN.",
      "en": "Ex-ESPN goal call.",
      "es": "Grito de gol ex-ESPN."
    },
    "b": {
      "pt": "Narrador com longa estrada na ESPN, é um dos reforços de peso que a CazéTV trouxe da TV tradicional para as grandes coberturas. Experiência e grito de gol afiado para os momentos decisivos.",
      "en": "An announcer with a long ESPN career, one of the big-name hires CazéTV brought from traditional TV for its major broadcasts.",
      "es": "Narrador con larga trayectoria en ESPN, uno de los fichajes de peso que CazéTV trajo de la TV tradicional."
    }
  },
  "hazan": {
    "n": "Marcelo Hazan",
    "r": "Narrador",
    "img": "",
    "acc": "pL",
    "ini": "MH",
    "d": {
      "pt": "Narração raiz, jeito Cazé.",
      "en": "Old-school calls, Cazé style.",
      "es": "Narración pura, estilo Cazé."
    },
    "b": {
      "pt": "Narrador experiente que integra o time de vozes da CazéTV, reforçando a escalação de peso do canal para as transmissões esportivas.",
      "en": "An experienced announcer on CazéTV's roster of voices for its sports broadcasts.",
      "es": "Narrador experimentado en el plantel de voces de CazéTV para sus transmisiones."
    }
  },
  "donan": {
    "n": "Fernando Campos “Donan”",
    "r": "Comentarista",
    "img": "https://assets.goal.com/images/v3/blte5f5605fd78aa300/crop/MM5DIMBQHIZDENJ2NZXXOZJ2GA5DQOA=/Guj9pZrWYAERttz.jpeg",
    "acc": "pD",
    "ini": "FC",
    "d": {
      "pt": "Análise com samba no pé.",
      "en": "Analysis with flair.",
      "es": "Análisis con samba."
    },
    "b": {
      "pt": "Conhecido carinhosamente como Donan, é cria do Esporte Interativo e passou pela ESPN Brasil antes de acertar com a CazéTV. Análise afiada com bom humor na medida — um dos comentaristas mais queridos da torcida.",
      "en": "Known as Donan, he came up through Esporte Interativo and ESPN Brasil before joining CazéTV — one of the fans' favorite analysts.",
      "es": "Conocido como Donan, se formó en Esporte Interativo y ESPN Brasil antes de llegar a CazéTV — uno de los comentaristas favoritos de la afición."
    }
  },
  "bruno": {
    "n": "Bruno Magalhães",
    "r": "Comentarista",
    "img": "",
    "acc": "pD",
    "ini": "BM",
    "d": {
      "pt": "Tática e treta na medida.",
      "en": "Tactics and banter, just right.",
      "es": "Táctica y pique a medida."
    },
    "b": {
      "pt": "Rodou por Esporte Interativo e TNT Sports antes de se firmar como comentarista da CazéTV. Traz leitura tática e opinião na ponta da língua, sem medo de comprar a treta boa.",
      "en": "After Esporte Interativo and TNT Sports, he established himself as a CazéTV analyst, bringing sharp tactical reads and strong opinions.",
      "es": "Tras Esporte Interativo y TNT Sports, se consolidó como comentarista de CazéTV, con lectura táctica afilada y opinión firme."
    }
  },
  "beltrao": {
    "n": "Guilherme Beltrão",
    "r": "Comentarista",
    "img": "https://assets.goal.com/images/v3/blt3325162e3ec03e08/crop/MM5DCMRSHE5DMOJRHJXG653FHI2TMORTGI2Q====/Fkc8GIHXkAIoHPO.jpeg",
    "acc": "pD",
    "ini": "GB",
    "d": {
      "pt": "Rei dos reacts da firma.",
      "en": "King of the crew's reacts.",
      "es": "Rey de los reacts."
    },
    "b": {
      "pt": "Cria do Esporte Interativo/TNT e produtor do EI Games. Na CazéTV comanda boa parte dos reacts — reúne a galera para comentar ao vivo os jogos que o canal não transmite, reagindo aos melhores momentos. Amigo de longa data do Casimiro.",
      "en": "An Esporte Interativo/TNT product and EI Games producer, he leads many of CazéTV's watch-along reacts. A longtime friend of Casimiro.",
      "es": "Formado en Esporte Interativo/TNT y productor de EI Games, lidera muchos de los reacts de CazéTV. Amigo de años de Casimiro."
    }
  },
  "rafaeloliveira": {
    "n": "Rafael Oliveira",
    "r": "Comentarista",
    "img": "https://assets.goal.com/images/v3/blt8cbc159f08af01c4/crop/MM5DCMBYGA5DMMBYHJXG653FHI2TUMA=/5d54759836579.webp",
    "acc": "pD",
    "ini": "RO",
    "d": {
      "pt": "Análise ex-ESPN e Band.",
      "en": "Ex-ESPN & Band analysis.",
      "es": "Análisis ex-ESPN y Band."
    },
    "b": {
      "pt": "Comentarista rodado: passou por Esporte Interativo, DAZN, ESPN e pela Band, onde ficou quatro anos. Chegou à CazéTV em setembro de 2024, primeiro para a Eurocopa, e ficou de vez.",
      "en": "A well-traveled analyst (Esporte Interativo, DAZN, ESPN, four years at Band). He joined CazéTV in 2024 and stayed for good.",
      "es": "Comentarista rodado (Esporte Interativo, DAZN, ESPN, cuatro años en Band). Llegó a CazéTV en 2024 y se quedó."
    }
  },
  "jucabral": {
    "n": "Ju Cabral",
    "r": "Comentarista",
    "img": "https://assets.goal.com/images/v3/blt86956659c073ad59/Sem%20t%C3%ADtulo.jpg",
    "acc": "pB",
    "ini": "JC",
    "d": {
      "pt": "Ex-seleção, análise de craque.",
      "en": "Ex-national team, star analysis.",
      "es": "Ex-selección, análisis de crack."
    },
    "b": {
      "pt": "Ex-jogadora da seleção brasileira, virou uma das analistas mais respeitadas do país. Foi voz de destaque da CazéTV na Copa do Mundo feminina, trazendo a leitura de quem viveu o gramado no alto nível.",
      "en": "A former Brazil national-team player turned respected analyst, she was a key CazéTV voice at the Women's World Cup.",
      "es": "Ex-jugadora de la selección brasileña y analista respetada, fue voz clave de CazéTV en el Mundial femenino."
    }
  },
  "marcus": {
    "n": "Marcus Carvalho",
    "r": "Comentarista",
    "img": "https://assets.goal.com/images/v3/blt48c3a3eb4e939fae/crop/MM5DGMRQHIYTQMB2NZXXOZJ2GI2DUNBT/GnNmDKWWUAAw1aG.jpeg",
    "acc": "pD",
    "ini": "MC",
    "d": {
      "pt": "Tática na veia.",
      "en": "Tactics in the blood.",
      "es": "Táctica en la vena."
    },
    "b": {
      "pt": "Comentarista do time da CazéTV, presente nas análises e nos debates que embalam as transmissões do canal.",
      "en": "A CazéTV analyst, part of the debates and analysis that drive the channel's broadcasts.",
      "es": "Comentarista de CazéTV, presente en los análisis y debates del canal."
    }
  },
  "luisfolha": {
    "n": "Luís Folha",
    "r": "Comentarista",
    "img": "https://assets.goal.com/images/v3/bltae48d1f8b858bd20/crop/MM5DCMBYGA5DMMBYHJXG653FHIYDUNBRGY======/Dj9EXwcXsAAp-PF.jpeg",
    "acc": "pD",
    "ini": "LF",
    "d": {
      "pt": "Papo reto de bola.",
      "en": "Straight football talk.",
      "es": "Charla directa de fútbol."
    },
    "b": {
      "pt": "Comentarista da CazéTV, marca presença nas transmissões e nos papos de bola do canal com opinião direta.",
      "en": "A CazéTV analyst, present in the channel's broadcasts and football talk.",
      "es": "Comentarista de CazéTV, presente en las transmisiones del canal."
    }
  },
  "lucaspedrosa": {
    "n": "Lucas Pedrosa",
    "r": "Comentarista",
    "img": "",
    "acc": "pD",
    "ini": "LP",
    "d": {
      "pt": "Também comenta no SBT.",
      "en": "Also on SBT.",
      "es": "También comenta en SBT."
    },
    "b": {
      "pt": "Mais um nome forjado no Esporte Interativo, hoje divide o trabalho de comentarista entre a CazéTV e o SBT.",
      "en": "Another Esporte Interativo alum, he splits analyst duties between CazéTV and SBT.",
      "es": "Otro ex-Esporte Interativo, divide su trabajo entre CazéTV y SBT."
    }
  },
  "rafaeldasilva": {
    "n": "Rafael da Silva",
    "r": "Comentarista",
    "img": "https://assets.goal.com/images/v3/getty-1341509081/crop/MM5DKMBQGQ5DEOBRGU5G433XMU5DAORSGYYQ====/GettyImages-1341509081.jpg",
    "acc": "pD",
    "ini": "RS",
    "d": {
      "pt": "Bola e resenha na mesma jogada.",
      "en": "Football and banter in one.",
      "es": "Fútbol y charla en la misma jugada."
    },
    "b": {
      "pt": "Comentarista da CazéTV que soma análise e resenha na mesma jogada, no clima descontraído da casa.",
      "en": "A CazéTV analyst who blends analysis and banter in the channel's laid-back style.",
      "es": "Comentarista de CazéTV que mezcla análisis y charla en el estilo relajado del canal."
    }
  },
  "gabrielsimoes": {
    "n": "Gabriel Simões",
    "r": "Comentarista",
    "img": "",
    "acc": "pD",
    "ini": "GS",
    "d": {
      "pt": "Produtor e comentarista.",
      "en": "Producer and analyst.",
      "es": "Productor y comentarista."
    },
    "b": {
      "pt": "Produtor de formação, com passagem por TNT Sports e Esporte Interativo antes de chegar à CazéTV, onde também entra nos comentários.",
      "en": "A producer with TNT Sports and Esporte Interativo experience before joining CazéTV, where he also comments.",
      "es": "Productor con paso por TNT Sports y Esporte Interativo antes de CazéTV, donde también comenta."
    }
  },
  "rafaelsaraiva": {
    "n": "Rafael Saraiva",
    "r": "Comentarista",
    "img": "",
    "acc": "pB",
    "ini": "RS",
    "d": {
      "pt": "Do Porta dos Fundos pro jogo.",
      "en": "From comedy to the game.",
      "es": "De la comedia al juego."
    },
    "b": {
      "pt": "Ator com passagem por projetos como o Porta dos Fundos, foi uma das apostas recentes da CazéTV, chegando para somar humor e carisma na cobertura do Mundial de Clubes.",
      "en": "An actor with a Porta dos Fundos background, one of CazéTV's recent additions for the Club World Cup coverage.",
      "es": "Actor con paso por Porta dos Fundos, una de las incorporaciones recientes de CazéTV para el Mundial de Clubes."
    }
  },
  "larissa": {
    "n": "Larissa Jardim",
    "r": "Comentarista",
    "img": "",
    "acc": "pB",
    "ini": "LJ",
    "d": {
      "pt": "Chegou pelo Café TV.",
      "en": "Started on Café TV.",
      "es": "Llegó por Café TV."
    },
    "b": {
      "pt": "Influenciadora digital que chegou à CazéTV para atuar no programa Café TV e ganhou espaço na equipe, trazendo a linguagem da internet para o time.",
      "en": "A digital influencer who joined CazéTV on the Café TV show, bringing internet-native language to the team.",
      "es": "Influencer digital que llegó a CazéTV por el programa Café TV, aportando el lenguaje de internet al equipo."
    }
  },
  "luizff": {
    "n": "Luiz Fernando Filho",
    "r": "Comentarista",
    "img": "",
    "acc": "pD",
    "ini": "LF",
    "d": {
      "pt": "Voz da firma.",
      "en": "Voice of the crew.",
      "es": "Voz de la firma."
    },
    "b": {
      "pt": "Comentarista que integra a equipe da CazéTV nas transmissões e coberturas do canal.",
      "en": "An analyst on CazéTV's team for the channel's broadcasts and coverage.",
      "es": "Comentarista del equipo de CazéTV para las transmisiones del canal."
    }
  },
  "djalminha": {
    "n": "Djalminha",
    "r": "Comentarista",
    "img": "https://assets.goal.com/images/v3/getty-2154788500/crop/MM5DGMBQGA5DCNRYHA5G433XMU5DAORQ/GettyImages-2154788500.jpg",
    "acc": "pB",
    "ini": "DJ",
    "d": {
      "pt": "Craque virou comentarista.",
      "en": "Star turned analyst.",
      "es": "Crack vuelto comentarista."
    },
    "b": {
      "pt": "Ídolo do Deportivo La Coruña e da seleção brasileira, foi um dos meias mais geniais e polêmicos da sua geração. Hoje leva a visão — e a sinceridade — de craque para os comentários da CazéTV.",
      "en": "An idol of Deportivo La Coruña and Brazil, one of the most gifted playmakers of his era, now bringing a star's honesty to CazéTV.",
      "es": "Ídolo del Deportivo La Coruña y de Brasil, uno de los enganches más geniales de su generación, hoy con la sinceridad de un crack en CazéTV."
    }
  },
  "rodrigocaio": {
    "n": "Rodrigo Caio",
    "r": "Comentarista",
    "img": "https://assets.goal.com/images/v3/getty-1828916311/crop/MM5DIMBQGA5DEMRVGA5G433XMU5DAORSGA4Q====/GettyImages-1828916311.jpg",
    "acc": "pD",
    "ini": "RC",
    "d": {
      "pt": "Zagueiro campeão, agora analista.",
      "en": "Champion CB, now analyst.",
      "es": "Zaguero campeón, ahora analista."
    },
    "b": {
      "pt": "Revelado pelo São Paulo e campeão da Libertadores 2019 pelo Flamengo, com passagem pela seleção brasileira. Traz a leitura de quem defendeu as maiores camisas do país, direto para dentro da análise.",
      "en": "Revealed by São Paulo and a 2019 Libertadores champion with Flamengo, with Brazil caps — he brings a top-level player's read.",
      "es": "Formado en São Paulo y campeón de la Libertadores 2019 con Flamengo, con pasado en la selección — aporta la lectura de quien jugó al máximo nivel."
    }
  },
  "quaresma": {
    "n": "Ricardo Quaresma",
    "r": "Comentarista",
    "img": "https://assets.goal.com/images/v3/getty-1826873693/crop/MM5DEOBXGI5DCNRRGY5G433XMU5DAORRGUYA====/GettyImages-1826873693.jpg",
    "acc": "pD",
    "ini": "RQ",
    "d": {
      "pt": "Craque português na área.",
      "en": "Portuguese star in the house.",
      "es": "Crack portugués en el área."
    },
    "b": {
      "pt": "Craque português eternizado pela “trivela”, com passagens por Porto, Inter de Milão, Beşiktaş, Chelsea e a seleção de Portugal. Uma das estrelas internacionais que dão brilho às transmissões da Cazé.",
      "en": "A Portuguese star famed for the 'trivela', with spells at Porto, Inter, Beşiktaş, Chelsea and Portugal — one of Cazé's international names.",
      "es": "Crack portugués célebre por la 'trivela', con paso por Porto, Inter, Beşiktaş, Chelsea y Portugal — una de las estrellas internacionales de Cazé."
    }
  },
  "romario": {
    "n": "Romário",
    "r": "Comentarista",
    "img": "",
    "acc": "pB",
    "ini": "RO",
    "d": {
      "pt": "Baixinho. Fenômeno. Lenda.",
      "en": "Baixinho. Phenomenon. Legend.",
      "es": "Baixinho. Fenómeno. Leyenda."
    },
    "b": {
      "pt": "Baixinho, Fenômeno, tetracampeão do mundo em 1994 e um dos maiores artilheiros da história do futebol. Quando aparece na Cazé, é aula de área e resenha sem filtro na mesma medida.",
      "en": "One of football's greatest scorers and a 1994 World Cup winner. When he shows up on Cazé, it's a masterclass and unfiltered banter.",
      "es": "Uno de los mayores goleadores de la historia y campeón del mundo en 1994. Cuando aparece en Cazé, es cátedra y charla sin filtro."
    }
  },
  "igor": {
    "n": "Igor Rodrigues",
    "r": "Apresentador",
    "img": "https://assets.goal.com/images/v3/blta466ab1cc04345b5/crop/MM5DEMBUHA5DCMJVGI5G433XMU5DAORZHA======/GoE6H2OXgAAQ2cy.jpeg",
    "acc": "pC",
    "ini": "IR",
    "d": {
      "pt": "Comanda o estúdio.",
      "en": "Runs the studio.",
      "es": "Comanda el estudio."
    },
    "b": {
      "pt": "Apresentador que comanda o estúdio da CazéTV, conduzindo programas, debates e a cobertura ao vivo dos grandes eventos.",
      "en": "A host who runs CazéTV's studio, leading shows, debates and live coverage of major events.",
      "es": "Presentador que comanda el estudio de CazéTV, conduciendo programas, debates y la cobertura en vivo."
    }
  },
  "barbara": {
    "n": "Bárbara Coelho",
    "r": "Apresentadora",
    "img": "https://assets.goal.com/images/v3/blt8145b814c9eec3e7/crop/MM5DCNJTGY5DQNRUHJXG653FHIYDUNJV/GrLzf2FWQAABNNs.jpeg",
    "acc": "pC",
    "ini": "BC",
    "d": {
      "pt": "Apresentação de primeira.",
      "en": "Top-class hosting.",
      "es": "Presentación de primera."
    },
    "b": {
      "pt": "Jornalista esportiva de estrada, com passagens por grandes emissoras do país. Reforça a apresentação da CazéTV com experiência, presença e domínio de estúdio.",
      "en": "A seasoned sports journalist with major-network experience, she strengthens CazéTV's hosting with presence and command.",
      "es": "Periodista deportiva de trayectoria, con paso por grandes cadenas, refuerza la presentación de CazéTV."
    }
  },
  "adnet": {
    "n": "Marcelo Adnet",
    "r": "Apresentador",
    "img": "https://assets.goal.com/images/v3/bltbd7920c77dcc1430/51733506266_27f01d978d_o.jpg",
    "acc": "pC",
    "ini": "MA",
    "d": {
      "pt": "Humor no meio do jogo.",
      "en": "Comedy mid-game.",
      "es": "Humor en pleno partido."
    },
    "b": {
      "pt": "Humorista e apresentador consagrado, dono de imitações que viraram marca registrada. Na Cazé, leva o humor para o meio das transmissões e transforma jogo em programa de variedades.",
      "en": "A celebrated comedian and host whose impressions are a trademark, bringing comedy into the middle of Cazé's broadcasts.",
      "es": "Humorista y presentador consagrado, con imitaciones de marca, lleva el humor al medio de las transmisiones de Cazé."
    }
  },
  "daynatale": {
    "n": "Day Natale",
    "r": "Repórter",
    "img": "https://assets.goal.com/images/v3/bltc72caaa4f9bd5c7f/crop/MM5DCNJTGY5DQNRUHJXG653FHIYDUNJZGI======/GunXm8rXcAAkEoV.jpeg",
    "acc": "pE",
    "ini": "DN",
    "d": {
      "pt": "Direto do gramado.",
      "en": "Straight from the pitch.",
      "es": "Directo del campo."
    },
    "b": {
      "pt": "Repórter da CazéTV, traz a cobertura direto dos gramados, da beira do campo e dos bastidores dos grandes eventos.",
      "en": "A CazéTV reporter, bringing coverage straight from the pitch and the behind-the-scenes.",
      "es": "Reportera de CazéTV, con cobertura directa desde el campo y los bastidores."
    }
  },
  "chicomoedas": {
    "n": "Chico Moedas",
    "r": "Repórter",
    "img": "https://assets.goal.com/images/v3/bltec47535b828cda0e/crop/MM5DINZZHIZDMOJ2NZXXOZJ2GA5DQOA=/images.jpg",
    "acc": "pE",
    "ini": "CM",
    "d": {
      "pt": "Reportagem descontraída.",
      "en": "Laid-back reporting.",
      "es": "Reportaje relajado."
    },
    "b": {
      "pt": "Criador de conteúdo e repórter, leva para a CazéTV a cobertura descontraída e a linguagem da internet que conversa direto com a torcida jovem.",
      "en": "A creator and reporter who brings laid-back, internet-native coverage to CazéTV's young crowd.",
      "es": "Creador y reportero que lleva a CazéTV la cobertura relajada y el lenguaje de internet."
    }
  },
  "fredcaldeira": {
    "n": "Fred Caldeira",
    "r": "Repórter",
    "img": "https://assets.goal.com/images/v3/bltf042afc7084a93c6/crop/MM5DINBXHIZDKMJ2NZXXOZJ2GA5DA===/images%20(2).jpg",
    "acc": "pE",
    "ini": "FC",
    "d": {
      "pt": "De campo em campo.",
      "en": "From pitch to pitch.",
      "es": "De campo en campo."
    },
    "b": {
      "pt": "Repórter da CazéTV nas coberturas de campo, de estádio em estádio, garantindo a informação quente durante as transmissões.",
      "en": "A CazéTV field reporter, stadium to stadium, delivering the hot info during broadcasts.",
      "es": "Reportero de campo de CazéTV, de estadio en estadio, con la info caliente durante las transmisiones."
    }
  },
  "allanstag": {
    "n": "Allan Stag",
    "r": "A firma",
    "img": "",
    "acc": "pE",
    "ini": "AS",
    "d": {
      "pt": "O Estagiário. Xodó da firma.",
      "en": "The Intern. Crew favorite.",
      "es": "El Becario. Consentido de la firma."
    },
    "b": {
      "pt": "O “Estagiário” que caiu nas graças da torcida e virou presença fixa na programação da CazéTV. A prova viva de que, na Cazé, até o estágio vira estrela — puro carisma e meme.",
      "en": "The 'Intern' who won over the fans and became a fixture on CazéTV — proof that at Cazé even the intern becomes a star.",
      "es": "El 'Becario' que conquistó a la afición y se volvió fijo en CazéTV — prueba de que en Cazé hasta el becario se vuelve estrella."
    }
  },
  "voce": {
    "n": "Você",
    "r": "Torcida",
    "img": "",
    "acc": "pT",
    "ini": "★",
    "d": {
      "pt": "O 12º jogador.",
      "en": "The 12th player.",
      "es": "El jugador nº12."
    },
    "b": {
      "pt": "A torcida. Os mais de 40 milhões de pessoas que fazem a CazéTV ser o que é. É o público que canta, comenta no chat e transforma transmissão em festa. Sem você, não tem grito de gol.",
      "en": "The fans. The 40M+ people who make CazéTV what it is — the crowd that turns a broadcast into a party. Without you, there's no goal celebration.",
      "es": "La afición. Los más de 40 millones que hacen a CazéTV lo que es — el público que convierte la transmisión en fiesta. Sin ti, no hay gol."
    }
  }
};
(function() {
  var modal = document.getElementById('bioModal');

  function open(id) {
    var d = BIOS[id];
    if (!d) return;
    open.cur = id;
    var L = window.__lang || 'pt';
    document.getElementById('bmName').textContent = d.n;
    document.getElementById('bmRole').textContent = (L === 'pt' ? d.r : ((window.ROLE && window.ROLE[d.r] && window.ROLE[d.r][L]) || d.r));
    document.getElementById('bmBio').textContent = (typeof d.b === 'string' ? d.b : (d.b[L] || d.b.pt));
    var p = document.getElementById('bmPort');
    p.className = 'bmport ' + d.acc;
    p.innerHTML = (d.img ? ('<img src="' + d.img + '" alt="" onerror="this.remove()">') : '') + '<span class="ini">' + d.ini + '</span>';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.tcard[data-p]').forEach(function(c) {
    c.addEventListener('click', function() {
      open(c.getAttribute('data-p'));
    });
  });
  modal.querySelector('.bmback').addEventListener('click', close);
  modal.querySelector('.bmclose').addEventListener('click', close);
  addEventListener('keydown', function(e) {
    if (e.key === 'Escape') close();
  });
  window.__openBio = open;
})();


(function() {
  var H = document.documentElement,
    b = document.getElementById('themeBtn');

  function set(t) {
    H.setAttribute('data-theme', t);
    b.innerHTML = t === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    try {
      localStorage.setItem('cztheme', t)
    } catch (e) {}
  }
  b.addEventListener('click', function() {
    set(H.getAttribute('data-theme') === 'light' ? 'dark' : 'light')
  });
  var saved = null;
  try {
    saved = localStorage.getItem('cztheme')
  } catch (e) {}
  set(saved || 'dark');
})();


var TR = {
  "nav.colecao": {
    "pt": "Coleção",
    "en": "Collection",
    "es": "Colección"
  },
  "nav.elenco": {
    "pt": "Elenco",
    "en": "Cast",
    "es": "Equipo"
  },
  "nav.agenda": {
    "pt": "Agenda",
    "en": "Schedule",
    "es": "Agenda"
  },
  "nav.canais": {
    "pt": "Canais",
    "en": "Channels",
    "es": "Canales"
  },
  "nav.loja": {
    "pt": "Loja oficial",
    "en": "Official store",
    "es": "Tienda oficial"
  },
  "nav.lojam": {
    "pt": "Loja oficial ›",
    "en": "Official store ›",
    "es": "Tienda oficial ›"
  },
  "hero.eye": {
    "pt": "● A loja oficial da Cazé",
    "en": "● The official Cazé store",
    "es": "● La tienda oficial de Cazé"
  },
  "hero.h1a": {
    "pt": "A oficial",
    "en": "The real",
    "es": "La oficial"
  },
  "hero.h1b": {
    "pt": "é essa <span class=\"ouro\">aqui.</span>",
    "en": "deal is <span class=\"ouro\">here.</span>",
    "es": "es <span class=\"ouro\">esta.</span>"
  },
  "hero.sub": {
    "pt": "Camisa da Cazé, feita pra quem vive o jogo. Coleção da Copa <b>oficial</b>, direto da fonte.",
    "en": "The Cazé jersey, made for who lives the game. The <b>official</b> World Cup collection, straight from the source.",
    "es": "La camiseta de Cazé, para quien vive el juego. La colección <b>oficial</b> del Mundial, directo de la fuente."
  },
  "hero.cta1": {
    "pt": "Ver a coleção ›",
    "en": "See the collection ›",
    "es": "Ver la colección ›"
  },
  "hero.cta2": {
    "pt": "Onde assistir",
    "en": "Where to watch",
    "es": "Dónde ver"
  },
  "hero.scroll": {
    "pt": "rola aí ↓",
    "en": "scroll down ↓",
    "es": "desliza ↓"
  },
  "stat.yt": {
    "pt": "inscritos no YouTube",
    "en": "YouTube subscribers",
    "es": "suscriptores en YouTube"
  },
  "stat.ig": {
    "pt": "seguidores no Instagram",
    "en": "Instagram followers",
    "es": "seguidores en Instagram"
  },
  "stat.copa": {
    "pt": "jogos da Copa 2026",
    "en": "2026 World Cup matches",
    "es": "partidos del Mundial 2026"
  },
  "stat.free": {
    "pt": "de graça, no YouTube",
    "en": "free, on YouTube",
    "es": "gratis, en YouTube"
  },
  "drop.badge": {
    "pt": "✓ 100% oficial · licenciado",
    "en": "✓ 100% official · licensed",
    "es": "✓ 100% oficial · licenciado"
  },
  "drop.kick": {
    "pt": "O drop",
    "en": "The drop",
    "es": "El drop"
  },
  "drop.title": {
    "pt": "Chegou a coleção<br>da <span class=\"ouro\">Copa</span>",
    "en": "The <span class=\"ouro\">World Cup</span><br>collection is here",
    "es": "Llegó la colección<br>del <span class=\"ouro\">Mundial</span>"
  },
  "drop.lead": {
    "pt": "Quatro cores, edição da Copa. Quando acaba, acabou — então não vacila.",
    "en": "Four colors, World Cup edition. When it's gone, it's gone — so don't sleep on it.",
    "es": "Cuatro colores, edición Mundial. Cuando se acaba, se acabó — no te duermas."
  },
  "drop.buy": {
    "pt": "Garante a sua",
    "en": "Get yours",
    "es": "Consíguela"
  },
  "drop.trust": {
    "pt": "Compra segura pela loja oficial no Mercado Livre · +277 mil seguidores · troca garantida",
    "en": "Secure checkout at the official Mercado Livre store · 277k+ followers · easy returns",
    "es": "Compra segura en la tienda oficial de Mercado Livre · +277 mil seguidores · cambios garantizados"
  },
  "drop.size": {
    "pt": "Ficou na dúvida do tamanho? Bora resolver",
    "en": "Not sure about your size? Let's sort it out",
    "es": "¿Dudas con la talla? Vamos a resolverlo"
  },
  "drop.size.t": {
    "pt": "Tamanho",
    "en": "Size",
    "es": "Talla"
  },
  "drop.size.w": {
    "pt": "Largura (cm)",
    "en": "Width (cm)",
    "es": "Ancho (cm)"
  },
  "drop.size.h": {
    "pt": "Altura (cm)",
    "en": "Height (cm)",
    "es": "Alto (cm)"
  },
  "drop.size.note": {
    "pt": "Medida com a peça no plano. Na dúvida entre dois, pega o maior — modelagem de jogo.",
    "en": "Measured flat. Between two sizes, go bigger — game-day fit.",
    "es": "Medida en plano. Entre dos tallas, elige la mayor — corte de partido."
  },
  "p.tag1": {
    "pt": "Mais vendida",
    "en": "Best-seller",
    "es": "Más vendida"
  },
  "p.tag2": {
    "pt": "Time CazéTV",
    "en": "Team CazéTV",
    "es": "Equipo CazéTV"
  },
  "p.tag3": {
    "pt": "Clássica",
    "en": "Classic",
    "es": "Clásica"
  },
  "p.tag4": {
    "pt": "Nova",
    "en": "New",
    "es": "Nueva"
  },
  "p.tag5": {
    "pt": "Do dia a dia",
    "en": "Everyday",
    "es": "Del día a día"
  },
  "p.n1": {
    "pt": "Camisa 10 — Amarela",
    "en": "Jersey 10 — Yellow",
    "es": "Camiseta 10 — Amarilla"
  },
  "p.n2": {
    "pt": "Camisa 10 — Azul",
    "en": "Jersey 10 — Blue",
    "es": "Camiseta 10 — Azul"
  },
  "p.n3": {
    "pt": "Camisa Traje — Preta",
    "en": "Traje Jersey — Black",
    "es": "Camiseta Traje — Negra"
  },
  "p.n4": {
    "pt": "Camisa Traje — Branca",
    "en": "Traje Jersey — White",
    "es": "Camiseta Traje — Blanca"
  },
  "p.n5": {
    "pt": "Camisa Preta — Básica",
    "en": "Black Tee — Basic",
    "es": "Camiseta Negra — Básica"
  },
  "p.d1": {
    "pt": "A do Brasil. Cinco estrelas no peito.",
    "en": "The Brazil one. Five stars on the chest.",
    "es": "La de Brasil. Cinco estrellas en el pecho."
  },
  "p.d2": {
    "pt": "Escudo no coração. Time CazéTV.",
    "en": "Crest on the heart. Team CazéTV.",
    "es": "Escudo en el corazón. Equipo CazéTV."
  },
  "p.d3": {
    "pt": "Emblema dourado. Discreta e certeira.",
    "en": "Golden emblem. Sleek and sharp.",
    "es": "Emblema dorado. Discreta y certera."
  },
  "p.d4": {
    "pt": "Clássica, pra qualquer jogo.",
    "en": "A classic, for any match.",
    "es": "Clásica, para cualquier partido."
  },
  "p.d5": {
    "pt": "O básico que não erra. Dia a dia.",
    "en": "The no-fail basic. Everyday wear.",
    "es": "El básico infalible. Para el día a día."
  },
  "ag.kick": {
    "pt": "Onde assistir",
    "en": "Where to watch",
    "es": "Dónde ver"
  },
  "ag.title": {
    "pt": "Jogo é na <span class=\"ouro\">Cazé</span>",
    "en": "The game is on <span class=\"ouro\">Cazé</span>",
    "es": "El partido es en <span class=\"ouro\">Cazé</span>"
  },
  "ag.lead": {
    "pt": "De graça no YouTube. O que a Cazé acabou de mostrar — e o que vem por aí.",
    "en": "Free on YouTube. What Cazé just aired — and what's next.",
    "es": "Gratis en YouTube. Lo que Cazé acaba de emitir — y lo que viene."
  },
  "ag.live": {
    "pt": "Amanhã · 16h (Brasília)",
    "en": "Tomorrow · 4pm (BRT)",
    "es": "Mañana · 16h (BRT)"
  },
  "ag.match": {
    "pt": "Espanha é bicampeã mundial · gol de Ferran Torres na prorrogação · você viu na Cazé.",
    "en": "Spain are two-time world champions · Ferran Torres scored in extra time · you saw it on Cazé.",
    "es": "España es bicampeona del mundo · gol de Ferran Torres en la prórroga · lo viste en Cazé."
  },
  "ag.watch": {
    "pt": "Ver os melhores momentos",
    "en": "Watch the highlights",
    "es": "Ver lo mejor"
  },
  "ag.n1": {
    "pt": "Brasileirão",
    "en": "Brasileirão",
    "es": "Brasileirão"
  },
  "ag.n1d": {
    "pt": "Rodada a rodada · 1 jogo aberto",
    "en": "Every round · 1 open match",
    "es": "Cada jornada · 1 partido abierto"
  },
  "ag.n2": {
    "pt": "Libertadores",
    "en": "Libertadores",
    "es": "Libertadores"
  },
  "ag.n2d": {
    "pt": "melhores momentos",
    "en": "highlights",
    "es": "lo mejor"
  },
  "ag.n3": {
    "pt": "Europa League",
    "en": "Europa League",
    "es": "Europa League"
  },
  "ag.n3d": {
    "pt": "3 temporadas",
    "en": "3 seasons",
    "es": "3 temporadas"
  },
  "ag.n4": {
    "pt": "Mundial de Clubes",
    "en": "Club World Cup",
    "es": "Mundial de Clubes"
  },
  "ag.n4d": {
    "pt": "todos os jogos",
    "en": "every match",
    "es": "todos los partidos"
  },
  "el.kick": {
    "pt": "Quem faz a Cazé",
    "en": "Who makes Cazé",
    "es": "Quién hace Cazé"
  },
  "el.title": {
    "pt": "O time que <span class=\"ouro\">narra o Brasil</span>",
    "en": "The team that <span class=\"ouro\">calls the game</span>",
    "es": "El equipo que <span class=\"ouro\">narra el juego</span>"
  },
  "el.lead": {
    "pt": "Narradores, comentaristas, apresentadores, repórteres — e a torcida. O time inteiro que transformou jogo em festa. Ninguém joga sozinho.",
    "en": "Announcers, analysts, hosts, reporters — and the fans. The whole squad that turned matches into parties. Nobody plays alone.",
    "es": "Narradores, comentaristas, presentadores, reporteros — y la afición. El equipo que convirtió el partido en fiesta. Nadie juega solo."
  },
  "el.see": {
    "pt": "Ver perfil",
    "en": "View profile",
    "es": "Ver perfil"
  },
  "el.owners": {
    "pt": "Quem comanda por trás",
    "en": "Who runs it behind the scenes",
    "es": "Quién manda detrás"
  },
  "ow1b": {
    "pt": "LiveMode",
    "en": "LiveMode",
    "es": "LiveMode"
  },
  "ow1s": {
    "pt": "empresa dona da CazéTV",
    "en": "the company behind CazéTV",
    "es": "la empresa detrás de CazéTV"
  },
  "ow2b": {
    "pt": "Casimiro",
    "en": "Casimiro",
    "es": "Casimiro"
  },
  "ow2s": {
    "pt": "sócio da holding global do grupo",
    "en": "partner in the group's global holding",
    "es": "socio de la holding global del grupo"
  },
  "ow3b": {
    "pt": "Cristiano Ronaldo",
    "en": "Cristiano Ronaldo",
    "es": "Cristiano Ronaldo"
  },
  "ow3s": {
    "pt": "sócio investidor (2026)",
    "en": "investor & partner (2026)",
    "es": "socio inversor (2026)"
  },
  "ch.kick": {
    "pt": "Segue a Cazé",
    "en": "Follow Cazé",
    "es": "Sigue a Cazé"
  },
  "ch.title": {
    "pt": "Toda a torcida,<br>num lugar só",
    "en": "All the fans,<br>in one place",
    "es": "Toda la afición,<br>en un solo lugar"
  },
  "ch.lead": {
    "pt": "Os canais oficiais — pra não perder jogo, corte nem meme.",
    "en": "The official channels — never miss a match, a clip or a meme.",
    "es": "Los canales oficiales — no te pierdas partido, clip ni meme."
  },
  "ch.yt": {
    "pt": "YouTube · 40 mi de inscritos",
    "en": "YouTube · 40M subscribers",
    "es": "YouTube · 40 M de suscriptores"
  },
  "ch.ig": {
    "pt": "Instagram · 22 mi de seguidores",
    "en": "Instagram · 22M followers",
    "es": "Instagram · 22 M de seguidores"
  },
  "ch.co": {
    "pt": "YouTube · 3,1 mi de inscritos",
    "en": "YouTube · 3.1M subscribers",
    "es": "YouTube · 3,1 M de suscriptores"
  },
  "ch.wa": {
    "pt": "Avisos e novidades",
    "en": "Alerts & news",
    "es": "Avisos y novedades"
  },
  "ch.b1": {
    "pt": "Assistir ›",
    "en": "Watch ›",
    "es": "Ver ›"
  },
  "ch.b2": {
    "pt": "Seguir ›",
    "en": "Follow ›",
    "es": "Seguir ›"
  },
  "ch.b3": {
    "pt": "Ver cortes ›",
    "en": "See clips ›",
    "es": "Ver clips ›"
  },
  "ch.b4": {
    "pt": "Entrar ›",
    "en": "Join ›",
    "es": "Entrar ›"
  },
  "nt.kick": {
    "pt": "Não perde o próximo",
    "en": "Don't miss the next one",
    "es": "No te pierdas el próximo"
  },
  "nt.title": {
    "pt": "Avisa quando cair<br>o próximo <span class=\"ouro\">drop</span>",
    "en": "Ping me when the next<br><span class=\"ouro\">drop</span> lands",
    "es": "Avísame cuando caiga<br>el próximo <span class=\"ouro\">drop</span>"
  },
  "nt.text": {
    "pt": "Deixa teu contato que a gente te avisa — simplesmente.",
    "en": "Drop your contact and we'll let you know — simple as that.",
    "es": "Deja tu contacto y te avisamos — así de simple."
  },
  "nt.ph": {
    "pt": "seu e-mail ou WhatsApp",
    "en": "your email or WhatsApp",
    "es": "tu email o WhatsApp"
  },
  "nt.btn": {
    "pt": "Quero ser avisado",
    "en": "Notify me",
    "es": "Avísenme"
  },
  "ft.tag": {
    "pt": "A loja oficial da maior torcida do YouTube. Aqui é o oficial — cuidado com réplica.",
    "en": "The official store of YouTube's biggest crowd. This is the real one.",
    "es": "La tienda oficial de la mayor afición de YouTube. Esta es la de verdad."
  },
  "ft.nav": {
    "pt": "Navegar",
    "en": "Browse",
    "es": "Navegar"
  },
  "ft.of": {
    "pt": "Oficial",
    "en": "Official",
    "es": "Oficial"
  },
  "ft.l1": {
    "pt": "Coleção da Copa",
    "en": "World Cup collection",
    "es": "Colección del Mundial"
  },
  "ft.l2": {
    "pt": "Onde assistir",
    "en": "Where to watch",
    "es": "Dónde ver"
  },
  "ft.l3": {
    "pt": "Assista mais",
    "en": "Watch more",
    "es": "Mira más"
  },
  "ft.disc": {
    "pt": "<b>Conceito de estudo — não-oficial.</b> Página criada por Gabriel Gomes como peça de portfólio, sem vínculo com a CazéTV / LiveMode. Produtos, preços, números e agenda são reais (jul/2026), usados só para demonstração. Marcas de terceiros pertencem aos seus donos.",
    "en": "<b>Study concept — unofficial.</b> Page built by Gabriel Gomes as a portfolio piece, not affiliated with CazéTV / LiveMode. Products, prices, numbers and schedule are real (Jul 2026), used for demo only. Third-party brands belong to their owners.",
    "es": "<b>Concepto de estudio — no oficial.</b> Página creada por Gabriel Gomes como pieza de portafolio, sin vínculo con CazéTV / LiveMode. Productos, precios, números y agenda son reales (jul/2026), solo para demostración. Las marcas de terceros pertenecen a sus dueños."
  },
  "md.link": {
    "pt": "Ver na CazéTV",
    "en": "Watch on CazéTV",
    "es": "Ver en CazéTV"
  },
  "scta.t": {
    "pt": "Coleção da Copa",
    "en": "World Cup collection",
    "es": "Colección del Mundial"
  },
  "scta.s": {
    "pt": "a partir de R$ 72 · loja oficial",
    "en": "from R$72 · official store",
    "es": "desde R$72 · tienda oficial"
  },
  "scta.b": {
    "pt": "Garante a sua",
    "en": "Get yours",
    "es": "Consíguela"
  },
  "ag.tag": {
    "pt": "Campeão da Copa 2026",
    "en": "2026 World Cup Champion",
    "es": "Campeón del Mundial 2026"
  },
  "ag.t1": {
    "pt": "Espanha",
    "en": "Spain",
    "es": "España"
  },
  "ag.t2": {
    "pt": "Argentina",
    "en": "Argentina",
    "es": "Argentina"
  },
  "nav.assista": {
    "pt": "Assista",
    "en": "Watch",
    "es": "Mira"
  },
  "nav.sobre": {
    "pt": "Sobre",
    "en": "About",
    "es": "Acerca"
  },
  "as.kick": {
    "pt": "Assista mais",
    "en": "Watch more",
    "es": "Mira más"
  },
  "as.title": {
    "pt": "Melhores momentos<br>e onde <span class=\"ouro\">acompanhar</span>",
    "en": "Highlights<br>and where to <span class=\"ouro\">follow</span>",
    "es": "Lo mejor<br>y dónde <span class=\"ouro\">seguir</span>"
  },
  "as.lead": {
    "pt": "Reviva os lances e siga a Cazé em todos os canais.",
    "en": "Relive the plays and follow Cazé on every channel.",
    "es": "Revive las jugadas y sigue a Cazé en todos los canales."
  },
  "as.more": {
    "pt": "Quer ver mais? Tá tudo nos canais oficiais 👇",
    "en": "Want more? It's all on the official channels 👇",
    "es": "¿Quieres más? Está todo en los canales oficiales 👇"
  },
  "sb.kick": {
    "pt": "Sobre a Cazé",
    "en": "About Cazé",
    "es": "Acerca de Cazé"
  },
  "sb.title": {
    "pt": "O estádio agora é <span class=\"ouro\">digital</span>",
    "en": "The stadium is now <span class=\"ouro\">digital</span>",
    "es": "El estadio ahora es <span class=\"ouro\">digital</span>"
  },
  "sb.lead": {
    "pt": "A Copa de 2026 provou: não se assiste mais futebol como antes. O estádio virou digital, e a torcida se reúne em comunidade — do pré ao pós-jogo.",
    "en": "The 2026 World Cup proved it: we don't watch football like before. The stadium went digital, and fans gather as a community — from pre to post-match.",
    "es": "El Mundial 2026 lo probó: ya no vemos fútbol como antes. El estadio se volvió digital, y la afición se reúne en comunidad — del pre al pos-partido."
  },
  "sb.s1": {
    "pt": "de pessoas alcançadas na Copa 2026",
    "en": "people reached during the 2026 World Cup",
    "es": "personas alcanzadas en el Mundial 2026"
  },
  "sb.s2": {
    "pt": "do tempo assistido veio das Smart TVs",
    "en": "of watch time came from connected TVs",
    "es": "del tiempo visto vino de Smart TVs"
  },
  "sb.s3": {
    "pt": "maior canal de esporte do YouTube no Brasil",
    "en": "biggest sports channel on YouTube in Brazil",
    "es": "mayor canal de deportes de YouTube en Brasil"
  },
  "sb.body": {
    "pt": "A CazéTV, operada pela LiveMode, transmite os maiores eventos do esporte de graça no YouTube — e virou o ponto de encontro digital dessa torcida.",
    "en": "CazéTV, run by LiveMode, streams the biggest sports events for free on YouTube — and became the digital home of these fans.",
    "es": "CazéTV, operada por LiveMode, transmite los mayores eventos del deporte gratis en YouTube — y se volvió el punto de encuentro digital de esa afición."
  }
};
var ROLE = {
  "Fundador": {
    "en": "Founder",
    "es": "Fundador"
  },
  "Narrador": {
    "en": "Announcer",
    "es": "Narrador"
  },
  "Comentarista": {
    "en": "Analysis",
    "es": "Análisis"
  },
  "Apresentador": {
    "en": "Host",
    "es": "Presentador"
  },
  "Apresentadora": {
    "en": "Host",
    "es": "Presentadora"
  },
  "Repórter": {
    "en": "Reporter",
    "es": "Reportero"
  },
  "A firma": {
    "en": "The crew",
    "es": "La firma"
  },
  "Torcida": {
    "en": "The fans",
    "es": "Afición"
  }
};
window.ROLE = ROLE;
(function() {
  function ap(l) {
    window.__lang = l;
    document.documentElement.setAttribute("lang", l === "pt" ? "pt-BR" : l);
    document.querySelectorAll("[data-i18n]").forEach(function(e) {
      var k = e.getAttribute("data-i18n");
      if (TR[k] && TR[k][l] != null) e.textContent = TR[k][l];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function(e) {
      var k = e.getAttribute("data-i18n-html");
      if (TR[k] && TR[k][l] != null) e.innerHTML = TR[k][l];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function(e) {
      var k = e.getAttribute("data-i18n-ph");
      if (TR[k] && TR[k][l] != null) e.placeholder = TR[k][l];
    });
    document.querySelectorAll(".tcard[data-p]").forEach(function(c) {
      var id = c.getAttribute("data-p"),
        d = (window.BIOS || {})[id];
      if (!d) return;
      var r = c.querySelector(".role"),
        de = c.querySelector(".tdesc");
      if (r) r.textContent = (l === "pt" ? d.r : ((ROLE[d.r] && ROLE[d.r][l]) || d.r));
      if (de && d.d && d.d[l]) de.textContent = d.d[l];
    });
    document.querySelectorAll("#langSel button").forEach(function(b) {
      b.classList.toggle("on", b.getAttribute("data-lang") === l);
    });
    try {
      localStorage.setItem("czlang", l)
    } catch (e) {}
    if (window.__openBio && window.__openBio.cur && document.getElementById("bioModal").classList.contains("open")) window.__openBio(window.__openBio.cur);
  }
  document.querySelectorAll("#langSel button").forEach(function(b) {
    b.addEventListener("click", function() {
      ap(b.getAttribute("data-lang"));
    });
  });
  var sl = null;
  try {
    sl = localStorage.getItem("czlang")
  } catch (e) {}
  window.BIOS = BIOS;
  ap(sl || "pt");
})();
