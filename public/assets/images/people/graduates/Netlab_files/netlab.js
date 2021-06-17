'use strict';



;define("netlab/app", ["exports", "netlab/resolver", "ember-load-initializers", "netlab/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("netlab/components/list-pagination", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    publications: Ember.inject.service('publications'),
    tagName: "section",
    page: Ember.computed.alias("publications.page"),
    paginateBy: 10,
    numberOfPages: Ember.computed('page', 'total', function () {
      var n = this.get('total');
      var r = Math.ceil(n / this.get("paginateBy"));
      return r;
    }),
    pageNumbers: Ember.computed('numberOfPages', function () {
      var n = Array(this.get('numberOfPages'));

      for (var i = 0; i < n.length; i++) {
        n[i] = i + 1;
      }

      return n;
    }),
    showNext: Ember.computed('page', 'numberOfPages', function () {
      return this.get('page') < this.get('numberOfPages');
    }),
    showPrevious: Ember.computed('page', function () {
      return this.get('page') > 1;
    }),
    nextText: 'Next',
    previousText: 'Previous',
    actions: {
      nextClicked: function nextClicked() {
        if (this.get('page') + 1 <= this.get('numberOfPages')) {
          this.get('publications').nextPage();
        }
      },
      previousClicked: function previousClicked() {
        if (this.get('page') > 0) {
          this.get('publications').previousPage();
        }
      },
      pageClicked: function pageClicked(pageNumber) {
        this.get("publications").goToPage(pageNumber);
      }
    }
  });

  _exports.default = _default;
});
;define("netlab/components/nav-bar", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    actions: {
      showSubMenus: function showSubMenus() {
        Ember.$('.navbar .sub-nav').show();
      }
    }
  });

  _exports.default = _default;
});
;define("netlab/components/nav-item", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'li',
    classNames: 'nav-item',
    mouseEnter: function mouseEnter() {
      var menu = Ember.$('li#' + this.elementId + '.nav-item > ul.sub-nav');

      if (menu.is(':hidden') && Ember.$('.navbar-toggler').is(':hidden')) {
        menu.css("visibility", "visible").slideDown();
        Ember.$('#navbarToggler').removeClass('show');
      }
    },
    mouseLeave: function mouseLeave() {
      var menu = Ember.$("li#" + this.elementId + ".nav-item > ul.sub-nav");

      if (menu.not(':hidden') && Ember.$('.navbar-toggler').is(':hidden')) {
        menu.slideUp();
        Ember.$('#navbarToggler').removeClass('show');
      }
    }
  });

  _exports.default = _default;
});
;define("netlab/components/publication-item", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'li',
    classNames: ['mb-2'],
    init: function init() {
      this.set("uri", this.getBestUri());

      this._super.apply(this, arguments);
    },
    // Extracts the URI to minimize # of clicks for
    // getting the pdf
    getBestUri: function getBestUri() {
      var documents = this.get("model.documents");

      if (Ember.isPresent(documents)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = documents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var doc = _step.value;

            if (doc.security === "public" && Ember.isPresent(doc.uri)) {
              return doc.uri;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      var related = this.get("model.related_url");

      if (Ember.isPresent(related)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = related[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var uri = _step2.value;

            if (Ember.isPresent(uri.url)) {
              return uri.url;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return this.get("model.official_url");
    },
    uri: null
  });

  _exports.default = _default;
});
;define("netlab/components/publication-list", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'ul',
    classNames: ['custom', 'my-3'],
    publications: Ember.inject.service()
  });

  _exports.default = _default;
});
;define("netlab/components/resource-blog-row", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'tr'
  });

  _exports.default = _default;
});
;define("netlab/components/resource-talk-row", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'tr'
  });

  _exports.default = _default;
});
;define("netlab/controllers/acknowledgement", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var sponsors = [{
    name: "ARPA-E",
    year: "2018",
    imageClass: "arpae-logo",
    link: "https://arpa-e.energy.gov/"
  }, {
    name: "National Science Foundation",
    year: "2020",
    imageClass: "nsf-logo",
    link: "https://www.nsf.gov/"
  }, {
    name: "Schmidt Academy",
    year: "2021",
    imageClass: "sase-logo",
    link: "https://www.sase.caltech.edu/"
  }, {
    name: "Department of Energy",
    year: "2011",
    imageClass: "doe-logo",
    link: "https://energy.gov/"
  }, {
    name: "Defense Threat Reduction Agency (DTRA)",
    year: "2018",
    imageClass: "dtra-logo",
    link: "http://www.dtra.mil/"
  }, {
    name: "Southern California Edison (SCE)",
    year: "2014",
    imageClass: "sce-logo",
    link: "https://www.sce.com"
  }, {
    name: "Army Research Office",
    year: "2014",
    imageClass: "aro-logo",
    link: "http://www.arl.army.mil/www/default.cfm?page=29"
  }, {
    name: "Air Force Office of Scientific Research",
    year: "2005",
    imageClass: "afosr-logo",
    link: "http://www.wpafb.af.mil/afrl/afosr/"
  }, {
    name: "Los Alamos National Laboratory",
    year: "2016",
    imageClass: "los-alamos-logo",
    link: "http://www.lanl.gov/index.php"
  }, {
    name: "National Renewable Energy Laboratory (NREL)",
    year: "2016",
    imageClass: "nrel-logo",
    link: "https://www.nrel.gov/"
  }, {
    name: "Taiwan National Science Council",
    year: "2015",
    imageClass: "most-logo",
    link: "https://www.most.gov.tw/?l=en"
  }, {
    name: "Skoltech",
    year: "2018",
    imageClass: "skoltech-logo",
    link: "http://www.skoltech.ru/en/"
  }, {
    name: "Resnick",
    year: "2013",
    imageClass: "resnick-logo",
    link: "http://resnick.caltech.edu/"
  }, {
    name: "FLOW",
    year: "2016",
    imageClass: "flow-logo",
    link: "http://flow.caltech.edu/"
  }, {
    name: "Okawa Foundation",
    year: "2011",
    imageClass: "okawa-logo",
    link: "http://www.okawa-foundation.or.jp/"
  }, {
    name: "Nokia Bell Labs",
    year: "2014",
    imageClass: "bell-labs-logo",
    link: "https://www.bell-labs.com/"
  }, {
    name: "Alcatel-Lucent Enterprise",
    year: "2014",
    imageClass: "lucent-logo",
    link: "https://www.al-enterprise.com/en"
  }, {
    name: "Cisco",
    year: "2011",
    imageClass: "cisco-logo",
    link: "https://www.cisco.com/"
  }, {
    name: "PowerFlex Systems",
    year: "2018",
    imageClass: "powerflex-logo",
    link: "http://powerflexsystems.com/"
  }, {
    name: "Corning",
    year: "2003",
    imageClass: "corning-logo",
    link: "https://www.corning.com/worldwide/en.html"
  }, {
    name: "Level(3)",
    year: "2003",
    imageClass: "level-3-logo",
    link: "http://www.level3.com/en/"
  }, {
    name: "Juniper Networks",
    year: "2001",
    imageClass: "juniper-logo",
    link: "https://www.juniper.net/us/en/"
  }, {
    name: "SUN Microsystems",
    year: "2002",
    imageClass: "sun-logo",
    link: "https://www.oracle.com/index.html"
  }, {
    name: "Microsoft",
    year: "2001",
    imageClass: "microsoft-logo",
    link: "https://www.microsoft.com/en-us/"
  }, {
    name: "Intel",
    year: "2001",
    imageClass: "intel-logo",
    link: "https://www.intel.com/content/www/us/en/homepage.html"
  }];

  var _default = Ember.Controller.extend({
    sponsors: sponsors
  });

  _exports.default = _default;
});
;define("netlab/controllers/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var RECENT_LIMIT = 6;

  function highlightFilter(pub) {
    var publisher = pub.publication || "";
    return publisher.toLowerCase().match(/journal|transaction/);
  }

  var _default = Ember.Controller.extend({
    publications: Ember.inject.service(),
    recent: Ember.computed("publications.publications.[]", function () {
      return this.get("publications.publications").filter(highlightFilter).slice(0, RECENT_LIMIT);
    })
  });

  _exports.default = _default;
});
;define("netlab/controllers/people", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var people = {
    facultyCollaborators: [{
      name: "Adam Wierman",
      position: "Professor of Computing and Mathematical Sciences; Executive Officer for Computing and Mathematical Sciences; Director, Information Science and Technology",
      imageClass: "adam-wierman",
      link: "http://users.cms.caltech.edu/~adamw/"
    }, {
      name: "John Doyle",
      position: "Jean-Lou Chameau Professor of Control and Dynamical Systems, Electrical Engineering, and Bioengineering",
      imageClass: "john-doyle",
      link: "http://www.cds.caltech.edu/~doyle/wiki/index.php?title=Main_Page"
    }, {
      name: "Mani Chandy",
      position: "Simon Ramo Professor of Computer Science, Emeritus",
      imageClass: "mani-chandy",
      link: "http://www.cms.caltech.edu/people/mani"
    }],
    admin: [{
      name: "Christine Ortega",
      position: "Laboratory Research Assistant",
      imageClass: "christine"
    }],
    postdocs: [{
      name: "James Anderson",
      position: "Senior Postdoctoral Scholar in Computing and Mathematical Sciences",
      imageClass: "james-anderson",
      link: "http://www.its.caltech.edu/~james/",
      research: ["James is interested in distributed robust control, computational analysis of nonlinear dynamical systems, and scalable convex optimization methods with applications in systems biology and power systems. In particular, with regards to power systems, his research looks at the problem of disaggregating network data with the goal of creating realistic models that can be used for optimal power flow problems. This project aims to protect the data that belongs to grid operators while providing meaningful models for researchers to work with."]
    }],
    graduates: [{
      name: "Zach Lee",
      position: "PhD in Electrical Engineering",
      imageClass: "zach-lee",
      link: "http://www.its.caltech.edu/~zlee/",
      research: ["I am broadly interested in cyber-physical energy systems and the intersection of power systems, computer science, and software engineering. Specifically, I am currently working on systems for adaptive electric vehicle charging which uses software to allow users to install more EV charging stations at parking facilities without expensive infrastructure upgrades. I am also interested in microgrid design and control, distributed energy resources (DER), demand response, energy storage systems, and renewable energy integration."]
    }, {
      name: "Chen Liang",
      position: "PhD in Computing and Mathematical Sciences",
      imageClass: "chen-liang",
      research: ["My research interests include network science, graph theory, and power system analysis. Currently, I'm working on cascading failures in power systems."]
    }, {
      name: "Fengyu Zhou",
      position: "PhD in Electrical Engineering",
      imageClass: "fengyu-zhou",
      link: "https://scholar.google.com/citations?hl=en&user=i-oBMbYAAAAJ&view_op=list_works&gmla=AJsN-F750ajwJtiVfwwVEcPKbsi9QeYae3weVYD28AV8FCNsuryOGtodjf2dIA_nULOZCD5dMnjy_9jUqkO4CffF9yAkq6U7ts7Yd1RITjBfaggTor2Gf_8",
      research: ["I am interested in the control, optimization and signal processing in smart grid and cyber physical systems, as well as the mathematical optimization theory behind those problems. Currently, I am working on the load disaggregation in networked power systems."]
    }, {
      name: "Tongxin Li",
      position: "PhD in Computing and Mathematical Sciences",
      imageClass: "tongxin-li",
      research: ["Tongxin’s research interest focuses primarily on problems arising in electric grids. He has been working on solving problems related to graph topology identification and EV charging systems using data-driven methods. He became a PhD student at Caltech since 2017. Prior to this, he worked on various topics in communication and information theory such as group testing, compressed sensing, deletion channels and adversarial channels, etc. He received two bachelor degrees in both mathematics and information engineering from CUHK."]
    }, {
      name: "Lucien Werner",
      position: "PhD in Computing and Mathematical Sciences",
      imageClass: "lucien-werner",
      research: ["I am a first-year graduate student interested in cyber-physical systems, in particular stability analysis and control of power networks. In the past I have researched pattern formation in dynamical systems. Outside of mathematics, I have a career as a cellist and continue to perform around the world--often with my three sisters who are all also musicians and mathematicians. Prior to joining Caltech, I received degrees in mathematics, music, and politics from Northwestern University, Harvard University, and Montana State University."]
    }, {
      name: "Sunash Sharma",
      position: "Schmidt Academy Software Engineer",
      imageClass: "sunash-sharma",
      research: ["At a high level, I'm interested in developing robust software that enables impactful research. My work focuses on developing a simulation platform and live testbed for adaptive electric vehicle charging. I'm part of the inaugural class of the Schmidt Academy at Caltech, the aim of which is to bring well-engineered software to research groups around campus. In the past, I've worked on software and research in developmental biophysics, computational fluid dynamics. and quantum computation."]
    }],
    visitingPhDStudents: [{
      name: "Su Wang",
      position: "Graduate Student in Electronic and Computer Engineering, Hong Kong University of Science and Technology.",
      imageClass: "su-wang",
      research: ["My research interests are in the general area of optimization and game theory, with applications to power systems and electricity markets. I focus on the strategic behaviour analysis and market design in networked wholesale electricity markets."]
    }],
    visitingPostdocs: [{
      name: "Bo Sun",
      position: "Postdoc in Electronic and Computer Engineering, Hong Kong University of Science and Technology.",
      imageClass: "bo-sun",
      research: ["My research focuses on stochastic modeling and optimization with applications to smart energy systems. Currently, I am working on energy and mobility management of electric vehicles with plug-in charging and battery swapping, and transactive control of distributed energy resources in smart grids."]
    }],
    pastPostdocs: [{
      name: "Ki-Baek Kim",
      duration: "2001 - 2003"
    }, {
      name: "Cheng Jin",
      duration: "2002 - 2005",
      current: "Akamai",
      link: "https://www.linkedin.com/in/cheng-jin-8532141/"
    }, {
      name: "Werner Almsberger",
      duration: "2002 - 2003"
    }, {
      name: "Joon-Young Choi",
      duration: "2004 - 2005"
    }, {
      name: "Bartek Wydrowski",
      duration: "2004 - 2005",
      current: "Google",
      link: "https://www.linkedin.com/in/bartek-wydrowski-2164a4b/"
    }, {
      name: "Lachlan Andrew",
      duration: "2005 - 2008",
      current: "Monash University",
      link: "http://monash.edu/research/explore/en/persons/lachlan-andrew(fe94bb6c-9fab-4b23-ada5-d47c0d39729b).html"
    }, {
      name: "Chee-Wei Tan",
      duration: "2008 - 2009",
      current: "City University of Hong Kong",
      link: "http://www.cs.cityu.edu.hk/~cheewtan/"
    }, {
      name: "Sachin Adlakha",
      duration: "2010 - 2013",
      current: "NMLStream",
      link: "https://www.linkedin.com/in/sachin-adlakha-682aa061/"
    }, {
      name: "Libin Jiang",
      duration: "2010 - 2012",
      current: "Qualcomm",
      link: "https://www.linkedin.com/in/libin-jiang-45176b14/"
    }, {
      name: "Dennice Gayme",
      duration: "2011 - 2012",
      current: "Johns Hopkins",
      link: "https://engineering.jhu.edu/gayme/"
    }, {
      name: "Eilyan Bitar",
      duration: "2011 - 2012",
      current: "Cornell",
      link: "https://bitar.engineering.cornell.edu/"
    }, {
      name: "Yunjian Xu",
      duration: "2012 - 2013",
      current: "Singapore University of Technology and Design",
      link: "https://esd.sutd.edu.sg/people/faculty/yunjian-xu"
    }, {
      name: "Enrique Mallada",
      duration: "2013 - 2015",
      current: "Johns Hopkins",
      link: "https://mallada.ece.jhu.edu/"
    }, {
      name: "Krishnamurthy Dvijotham",
      duration: "2014 - 2016",
      current: "DeepMind (Google)",
      link: "https://dvij.github.io/"
    }],
    pastGraduateStudents: [{
      name: "David Lapsley",
      degree: "PhD 1999",
      degree_university: "Melbourne University",
      current: "Cisco",
      link: "https://www.linkedin.com/in/davidlapsley"
    }, {
      name: "Jiantao Wang",
      shared: "Doyle",
      degree: "PhD 2005",
      current: "Goldman Sachs",
      link: "https://www.linkedin.com/in/jiantao-wang-2127333"
    }, {
      name: "Lijun Chen",
      shared: "Doyle",
      degree: "PhD 2006",
      current: "U Colorado, Boulder",
      link: "http://spot.colorado.edu/~lich1539/"
    }, {
      name: "Lun Li",
      shared: "Doyle",
      degree: "PhD 2006",
      current: "OpenX, Pasadena",
      link: "https://www.linkedin.com/in/lunli/"
    }, {
      name: "Mortada Meyhar",
      degree: "PhD 2006",
      current: "Tesla",
      link: "https://www.linkedin.com/in/mortada"
    }, {
      name: "Kevin Tang",
      degree: "PhD 2006",
      current: "Cornell ECE",
      link: "https://people.ece.cornell.edu/atang/"
    }, {
      name: "David Wei",
      degree: "PhD 2006",
      current: "Facebook",
      link: "https://www.linkedin.com/in/davidwei79"
    }, {
      name: "Jayakrishnan Nair",
      shared: "Wierman",
      degree: "PhD 2012",
      current: "Indian Institute of Sciences",
      link: "https://www.ee.iitb.ac.in/web/faculty/homepage/jayakrishnan.nair"
    }, {
      name: "Subhonmesh Bose",
      degree: "PhD 2014",
      current: "UIUC ECE",
      link: "https://www.ece.illinois.edu/directory/profile/boses"
    }, {
      name: "Na Li",
      shared: "Doyle",
      degree: "PhD 2014",
      current: "Harvard EAS",
      link: "https://nali.seas.harvard.edu/"
    }, {
      name: "Zhenhua Liu",
      shared: "Wierman",
      degree: "PhD 2014",
      current: "SUNY Stony Brook",
      link: "http://www.ams.stonybrook.edu/~zhliu/"
    }, {
      name: "Lingwen Gan",
      degree: "PhD 2015",
      current: "Facebook",
      link: "https://www.a-star.edu.sg/ihpc/People/tid/355/Desmond-Cai-Wuhan.aspx"
    }, {
      name: "Desmond Cai",
      shared: "Wierman",
      degree: "PhD 2016",
      current: "Singapore A*STAR",
      link: "https://www.a-star.edu.sg/ihpc/People/tid/355/Desmond-Cai-Wuhan.aspx"
    }, {
      name: "Qiuyu Peng",
      degree: "PhD 2016",
      current: "Nuro",
      link: "https://www.linkedin.com/in/qiuyu-gavin-peng-2815a427"
    }, {
      name: "Changhong Zhao",
      degree: "PhD 2016",
      current: "NREL",
      link: "https://sites.google.com/site/changhongzhao19/"
    }, {
      name: "Niangjun Chen",
      shared: "Wierman",
      degree: "Phd 2017",
      current: "Singapore A*STAR",
      link: "https://niangjunchen.github.io"
    }, {
      name: "John Pang",
      shared: "Wierman",
      degree: "PhD 2019",
      current: "Schlumberger",
      link: "https://j-pang.github.io//#work"
    }, {
      name: "Linqi (Daniel) Guo",
      degree: "PhD 2019",
      current: "Stealth Startup",
      link: "https://scholar.google.com/citations?user=QixlSO4AAAAJ&hl=en"
    }, {
      name: "Yujie Tang",
      degree: "PhD 2019",
      current: "Harvard",
      link: "https://www.seas.harvard.edu/directory/ytang"
    }, {
      name: "Youngmi Ohk",
      degree: "MS 1998",
      degree_university: "Melbourne University",
      current: "Dawson Consulting Pty Ltd",
      link: "https://www.linkedin.com/in/youngmi-ohk-08b56/"
    }, {
      name: "Sanjeewa Athuraliya",
      degree: "MS 2000",
      current: "Ergon Energy",
      link: "https://www.linkedin.com/in/sanjeewa-athuraliya-71b31a5/"
    }, {
      name: "Craig Cameron",
      degree: "MS 2002",
      current: "Finisa",
      link: "https://www.linkedin.com/in/craigcameron/"
    }, {
      name: "John Pongsajapan",
      degree: "MS, 2006",
      current: "Square",
      link: "https://www.linkedin.com/in/johnpongsajapan/"
    }, {
      name: "Cheng Hu",
      degree: "MS 2006"
    }, {
      name: "Kevin Phan",
      degree: "MS 2009"
    }, {
      name: "Masoud Farivar",
      degree: "MS 2010",
      current: "Google",
      link: "https://www.linkedin.com/in/mfarivar/"
    }, {
      name: "George Lee",
      degree: "MS 2011",
      current: "Akamai",
      link: "https://www.linkedin.com/in/george-lee-17b3596/"
    }],
    pastVisitingFaculty: [{
      name: "Jin S Lee",
      duration: "2012",
      department: "EE",
      university: "Postech, Korea"
    }, {
      name: "Fernando Paganini",
      duration: "2013",
      department: '',
      university: "Universidad ORT, Uruguay"
    }, {
      name: "Angela Zhang",
      duration: "2014",
      department: '',
      university: "Chinese University of Hong Kong"
    }, {
      name: "Feng Liu",
      duration: "2015 - 2016",
      department: "Electrical Engineering",
      university: "Tsinghua University, Beijing, China"
    }, {
      name: "Janusz Bialek",
      duration: "2017",
      department: "Skoltech",
      university: "Moscow, Russia"
    }],
    pastVisitingPhDStudents: [{
      name: "Hyojeong (Dawn) Choe",
      duration: "2001 - 2003",
      department: "ECE",
      university: "Postech, Korea"
    }, {
      name: "Kyungmo Koo",
      duration: "2004 - 2005",
      department: "ECE",
      university: "Postech, Korea"
    }, {
      name: "Krister Jacobsson",
      duration: "2008 - 2009",
      university: "KTH, Sweden"
    }, {
      name: "Jongkyoo Kim",
      duration: "2010 - 2011",
      department: "ECE",
      university: "Postech, Korea"
    }, {
      name: "Kai Wang",
      duration: "2010 - 2011",
      department: "CS",
      university: "Tsinghua University, China"
    }, {
      name: "Chengdi Lai",
      duration: "2012 - 2013",
      department: "Fulbright Scholar, EEE",
      university: "Hong Kong University"
    }, {
      name: "Daniela Meola",
      duration: "2013 - 2014",
      department: "Control Department",
      university: "Università del Sannio, Italy"
    }, {
      name: "Yongmin Zhang",
      duration: "2013 - 2014",
      department: "Control Department",
      university: "Zhejiang University, China"
    }, {
      name: "Junhao Lin",
      duration: "2015 - 2016",
      department: "EEE",
      university: "Hong Kong University"
    }, {
      name: "Zhaojian Wang",
      duration: "2016-2017",
      department: "EE",
      university: "Tsinghua University, China"
    }, {
      name: "Pengcheng You",
      duration: "2016-2017",
      department: "ME & ECE",
      current: "Johns Hopkins University, USA",
      link: "https://sites.google.com/view/pengcheng-you"
    }, {
      name: "Yue Chen",
      duration: "2018-2019",
      department: "CMS",
      current: "Tsinghua University, China"
    }, {
      name: "Chenxi (Stephanie) Sun",
      duration: "2018-2019",
      department: "CMS",
      current: "Hong Kong University"
    }]
  };

  var _default = Ember.Controller.extend({
    people: people
  });

  _exports.default = _default;
});
;define("netlab/controllers/presentations", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var talks = [{
    title: "Intro to Power Flows",
    locations: [{
      description: "Simons Institute Real-time Decision Making Bookcamp (Power Systems), University of California, Berkeley, Jan 2018",
      resources: [{
        text: "Slides",
        link: "/assets/slides/Low-201801-SimonsBootcamp.pptx"
      }]
    }]
  }, {
    title: "Autonomous Energy Grid - Optimization",
    locations: [{
      description: "NREL Workshop on Autonomous Energy Grid, Golden CO, Sept 2017",
      resources: [{
        text: "Slides",
        link: "/assets/slides/Low-201709-AEGopt-NREL.pptx"
      }, {
        text: "PDF",
        link: "https://www.nrel.gov/grid/assets/pdfs/aeg-low.pdf"
      }]
    }]
  }, {
    title: "Adaptive Charging Network",
    locations: [{
      description: "Caltech Alumni College, Pasadena, CA, November 2016",
      resources: [{
        text: "Poster",
        link: "/assets/publications/ACN-201611.pdf"
      }]
    }, {
      description: "PFI:AIR-TT, NSF, DC, March 2017",
      resources: [{
        text: "Slides",
        link: "/assets/slides/Low-201703-AIR.pptx"
      }]
    }]
  }, {
    title: "Optimal Storage Placement and Power Flow Solution",
    locations: [{
      description: "NREL Workshop on Autonomous Energy Grid, Golden CO, Sept 2017",
      resources: [{
        text: "Slides",
        link: "/assets/slides/Low-201611-OptimalStorage+PFsol.pptx"
      }]
    }]
  }, {
    title: "Online Optimization of Power Networks",
    locations: [{
      description: "IPAM Workshop on Optimization and Equilibrium of Energy Economics, UCLA, CA, January 2016",
      resources: [{
        text: "Slides",
        link: "/assets/slides/Low-201601-OnlineAlg.pptx"
      }]
    }, {
      description: "Simons Institute Workshop, Berkeley, June 2016",
      resources: [{
        text: "Slides",
        link: "/assets/slides/Low-201606-OnlineAlg-SimonsBerkeley-short.pptx"
      }]
    }]
  }, {
    title: "Load-Side Frequency Control",
    locations: [{
      description: "Expert Conf on Advanced Mathematical Methods For Energy Systems, Skoltech, Moscow, Russia, June 2015",
      resources: [{
        text: "Slides",
        link: "/assets/slides/Low-201506-OLC3-Skoltech.pptx"
      }]
    }]
  }, {
    title: "Smart Grid Research",
    locations: [{
      description: "Cornell University, Ithaca, NY, March 2015",
      resources: [{
        text: "Slides",
        link: "/assets/slides/Low-201503-Cornell-Ithaca.pptx"
      }]
    }]
  }, {
    title: "Optimal Power Flow and Demand Response",
    locations: [{
      description: "i4Energy Seminar, CITRIS, UC Berkeley, April 2012",
      resources: [{
        text: "Slides",
        link: "/assets/slides/Low-201203-DR+OPF.pptx"
      }, {
        text: "Video",
        link: "http://youtu.be/WMDeIAXHAAw"
      }]
    }]
  }, {
    title: "Tutorial: TCP Congestion Control",
    locations: [{
      description: "PURSUIT Summer School, Cambridge University, UK, Aug 2011",
      resources: [{
        text: "Slides",
        link: "/assets/slides/Low-201108-TCP-Cambridge.pptx"
      }, {
        text: "Video Part I",
        link: "http://vimeo.com/39752673"
      }, {
        text: "Video Part II",
        link: "http://vimeo.com/39758488"
      }]
    }]
  }];
  var blogPosts = [{
    title: "A Network of Intelligent DER",
    subjects: [{
      link: "https://rigorandrelevance.wordpress.com/2014/09/18/a-network-of-intelligent-der/"
    }]
  }, {
    title: "Communication and Power Networks",
    subjects: [{
      subject: "Architecture",
      posts: [{
        text: "Part I",
        link: "https://rigorandrelevance.wordpress.com/2013/11/26/power-network-and-internet-i-architecture/"
      }, {
        text: "Part II",
        link: "https://rigorandrelevance.wordpress.com/2013/12/02/communication-and-power-networks-architecture-part-ii/"
      }]
    }, {
      subject: "Flow Optimization",
      posts: [{
        text: "Part I",
        link: "https://rigorandrelevance.wordpress.com/2014/05/05/communication-and-power-networks-flow-optimization-part-i/"
      }, {
        text: "Part II",
        link: "https://rigorandrelevance.wordpress.com/2014/05/19/communication-and-power-networks-flow-optimization-part-ii/"
      }]
    }, {
      subject: "Forward engineering",
      posts: [{
        text: "Part I",
        link: "https://rigorandrelevance.wordpress.com/2014/07/08/communication-and-power-networks-reverse-and-forward-engineering-part-i/"
      }, {
        text: "Part II",
        link: "https://rigorandrelevance.wordpress.com/2014/07/15/communication-and-power-networks-reverse-and-forward-engineering-part-ii/"
      }]
    }]
  }, {
    title: "Business Case of DER and Utility",
    subjects: [{
      link: "https://rigorandrelevance.wordpress.com/2014/12/02/business-case-for-der-and-utility/"
    }]
  }];

  var _default = Ember.Controller.extend({
    talks: talks,
    blogPosts: blogPosts
  });

  _exports.default = _default;
});
;define("netlab/controllers/publications", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    publications: Ember.inject.service(),
    queryParams: ['page', 'limit'],
    limit: 50,
    page: Ember.computed.alias('publications.page'),
    paginatedItems: Ember.computed('page', 'publications.publications.[]', function () {
      var i = (+this.get('page') - 1) * this.get("limit");
      var j = i + this.get("limit");
      return this.get('publications.publications').slice(i, j);
    })
  });

  _exports.default = _default;
});
;define("netlab/controllers/research/electric-vehicles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var DEFAULT_MILEAGE = {
    value: 1.6,
    time: "Aug 2018"
  };
  var DEFAULT_CO2 = {
    value: 540,
    time: "Aug 2018"
  };
  var MS_PER_DAY = 1000 * 3600 * 24;

  function getTodayBegin() {
    var now = Date.now();
    return now - now % MS_PER_DAY;
  }

  function formatTime(time) {
    return new Date(time).toDateString().split(' ').slice(1).join(' ');
  }

  function getSeries(response) {
    var series = Ember.get(response, "results.0.series.0.values") || [];
    return series = series.filter(function (pt) {
      return Ember.isPresent(pt[1]);
    });
  }

  var _default = Ember.Controller.extend({
    mileage: DEFAULT_MILEAGE,
    fetchMileage: function fetchMileage() {
      var _this = this;

      var start = getTodayBegin();
      var end = start + MS_PER_DAY - 1;
      Ember.$.get("https://caltech.powerflex.com/api/datasources/proxy/5/query?db=powerlogic&q=SELECT%20last(%22value%22)%20%20%2F%201000000*3.125%20FROM%20%22TotalEnergy%22%20WHERE%20%22host%22%20%3D%20%27cit-ca-2-pm-1%27%20AND%20time%20%3E%20".concat(start, "ms%20and%20time%20%3C%20").concat(end, "ms%20GROUP%20BY%20time(15m)&epoch=ms")).then(Ember.run.bind(this, function (response) {
        var series = getSeries(response); // This check ensures series !== []

        if (Ember.isNone(series)) {
          return;
        }

        var last = series[series.length - 1];

        _this.set("mileage", {
          value: (last[1] / 1000).toFixed(2),
          time: formatTime(last[0])
        });
      }));
    },
    CO2: DEFAULT_CO2,
    fetchCO2: function fetchCO2() {
      var _this2 = this;

      var start = getTodayBegin();
      var end = start + MS_PER_DAY - 1;
      Ember.$.get("https://caltech.powerflexsystems.com/api/datasources/proxy/5/query?db=powerlogic&q=SELECT%20last(%22value%22)%20*3.125%2F1000000*0.334%20FROM%20%22TotalEnergy%22%20WHERE%20%22host%22%20%3D%20%27cit-ca-2-pm-1%27%20AND%20time%20%3E%20".concat(start, "ms%20and%20time%20%3C%20").concat(end, "ms%20GROUP%20BY%20time(15m)%20fill(null)&epoch=ms")).then(Ember.run.bind(this, function (response) {
        var series = getSeries(response); // This check ensures series !== []

        if (Ember.isNone(series)) {
          return;
        }

        var last = series[series.length - 1];

        _this2.set("CO2", {
          value: last[1].toFixed(2),
          time: formatTime(last[0])
        });
      }));
    }
  });

  _exports.default = _default;
});
;define("netlab/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _and.default;
    }
  });
  Object.defineProperty(_exports, "and", {
    enumerable: true,
    get: function get() {
      return _and.and;
    }
  });
});
;define("netlab/helpers/app-version", ["exports", "netlab/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;
    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("netlab/helpers/eq", ["exports", "ember-truth-helpers/helpers/equal"], function (_exports, _equal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _equal.default;
    }
  });
  Object.defineProperty(_exports, "equal", {
    enumerable: true,
    get: function get() {
      return _equal.equal;
    }
  });
});
;define("netlab/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _gt.default;
    }
  });
  Object.defineProperty(_exports, "gt", {
    enumerable: true,
    get: function get() {
      return _gt.gt;
    }
  });
});
;define("netlab/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _gte.default;
    }
  });
  Object.defineProperty(_exports, "gte", {
    enumerable: true,
    get: function get() {
      return _gte.gte;
    }
  });
});
;define("netlab/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _isArray.default;
    }
  });
  Object.defineProperty(_exports, "isArray", {
    enumerable: true,
    get: function get() {
      return _isArray.isArray;
    }
  });
});
;define("netlab/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _isEmpty.default;
    }
  });
});
;define("netlab/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _isEqual.default;
    }
  });
  Object.defineProperty(_exports, "isEqual", {
    enumerable: true,
    get: function get() {
      return _isEqual.isEqual;
    }
  });
});
;define("netlab/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _lt.default;
    }
  });
  Object.defineProperty(_exports, "lt", {
    enumerable: true,
    get: function get() {
      return _lt.lt;
    }
  });
});
;define("netlab/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _lte.default;
    }
  });
  Object.defineProperty(_exports, "lte", {
    enumerable: true,
    get: function get() {
      return _lte.lte;
    }
  });
});
;define("netlab/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-equal"], function (_exports, _notEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _notEqual.default;
    }
  });
  Object.defineProperty(_exports, "notEq", {
    enumerable: true,
    get: function get() {
      return _notEqual.notEq;
    }
  });
});
;define("netlab/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _not.default;
    }
  });
  Object.defineProperty(_exports, "not", {
    enumerable: true,
    get: function get() {
      return _not.not;
    }
  });
});
;define("netlab/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _or.default;
    }
  });
  Object.defineProperty(_exports, "or", {
    enumerable: true,
    get: function get() {
      return _or.or;
    }
  });
});
;define("netlab/helpers/profile-image-class", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.profileImageClass = profileImageClass;
  _exports.default = void 0;

  function profileImageClass(params
  /* , hash*/
  ) {
    var profileClass = params[0];

    if (Ember.isPresent(profileClass)) {
      return profileClass;
    } else {
      return 'no-face';
    }
  }

  var _default = Ember.Helper.helper(profileImageClass);

  _exports.default = _default;
});
;define("netlab/helpers/string-slice", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.stringSlice = stringSlice;
  _exports.default = void 0;

  function stringSlice(params
  /* , hash*/
  ) {
    var str = params[0].toString();

    if (Ember.isPresent(str)) {
      if (params.length > 2 && Number.isInteger(params[1]) && Number.isInteger(params[2])) {
        return str.slice(params[1], params[2]);
      } else if (Number.isInteger(params[1])) {
        return str.slice(params[1]);
      }
    }
  }

  var _default = Ember.Helper.helper(stringSlice);

  _exports.default = _default;
});
;define("netlab/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _xor.default;
    }
  });
  Object.defineProperty(_exports, "xor", {
    enumerable: true,
    get: function get() {
      return _xor.xor;
    }
  });
});
;define("netlab/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "netlab/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("netlab/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',
    initialize: function initialize() {
      var app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
  _exports.default = _default;
});
;define("netlab/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("netlab/router", ["exports", "netlab/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL,
    init: function init() {
      // Different from didTransistion hook so that sub-routes
      // do not have to always bubble their didTransition event
      this.on("didTransition", function () {
        window.scrollTo(0, 0);
      });

      this._super.apply(this, arguments);
    }
  });
  Router.map(function () {
    this.route('research', function () {
      this.route('power-systems-steady-state');
      this.route('power-systems-dynamics');
      this.route('electric-vehicles');
      this.route('communication-networks');
    });
    this.route('people');
    this.route('publications');
    this.route('presentations');
    this.route('acknowledgement');
    this.route('not-found', {
      path: "*"
    });
  });
  var _default = Router;
  _exports.default = _default;
});
;define("netlab/routes/not-found", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo("index");
    }
  });

  _exports.default = _default;
});
;define("netlab/routes/publications", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    queryParams: {
      page: {
        refreshModel: true
      },
      limit: {
        refreshModel: true
      }
    }
  });

  _exports.default = _default;
});
;define("netlab/routes/research/electric-vehicles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    actions: {
      didTransition: function didTransition() {
        Ember.run.schedule('afterRender', function () {
          window.lightGallery(document.getElementById('deployment-gallery'), {
            selector: 'a',
            subHtmlSelectorRelative: true
          });
        });
        this.get("controller").fetchMileage();
        this.get("controller").fetchCO2();
      }
    }
  });

  _exports.default = _default;
});
;define("netlab/services/publications", ["exports", "ember-local-storage"], function (_exports, _emberLocalStorage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    init: function init() {
      this.recoverFromLocalStorage();

      if (Ember.isPresent(this.get("publications"))) {
        this.set("loaded", true);
      } // Ensure the pubs are updated


      this.fetchPublicationsInLibrary();

      this._super.apply(this, arguments);
    },
    page: 1,
    cachedPubs: (0, _emberLocalStorage.storageFor)("publications"),
    nextPage: function nextPage() {
      this.incrementProperty('page');
    },
    previousPage: function previousPage() {
      this.decrementProperty('page');
    },
    goToPage: function goToPage(page) {
      this.set("page", page);
    },
    publications: null,
    loaded: false,
    persistToLocalStorage: function persistToLocalStorage() {
      this.set("cachedPubs.cache", this.get("publications"));
    },
    recoverFromLocalStorage: function recoverFromLocalStorage() {
      this.set("publications", this.get("cachedPubs.cache") || []);
    },
    // Need to use JSONP inorder to get pass the cross-origin error
    fetchPublicationsInLibrary: function fetchPublicationsInLibrary() {
      var self = this;
      return Ember.$.getJSON("http://authors.library.caltech.edu/cgi/exportview/person-az/Low-S-H/JSON/Low-S-H.js?callback=?", function (entries) {
        var pubs = [];
        entries.forEach(function (entry) {
          var pub = {
            id: entry.eprintid,
            title: entry.title,
            documents: entry.documents,
            related_url: entry.related_url,
            book_title: entry.book_title,
            event_title: entry.event_title,
            creators: entry.creators,
            isbn: entry.isbn,
            ispublished: entry.ispublished,
            issn: entry.issn,
            date: entry.date,
            pagerange: entry.pagerange,
            datestamp: entry.datestamp,
            place_of_pub: entry.place_of_pub,
            publication: entry.publication,
            publisher: entry.publisher,
            official_url: entry.official_url,
            volume: entry.volume,
            number: entry.number
          };
          pubs.push(pub);
        });
        self.set("publications", pubs);
        self.set("loaded", true);
        self.persistToLocalStorage();
      }).fail(Ember.run.bind(this, function () {
        console.warn("Failed to fetch latest publication info");
      }));
    }
  });

  _exports.default = _default;
});
;define("netlab/storages/publications", ["exports", "ember-local-storage/local/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _object.default;
  _exports.default = _default;
});
;define("netlab/templates/acknowledgement", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "3ofuF64d",
    "block": "{\"symbols\":[\"sponsor\"],\"statements\":[[7,\"div\"],[11,\"class\",\"jumbotron jumbotron-acknowledgement-banner jumbotron-fluid\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"jumbotron-content text-light\"],[9],[0,\"\\n      \"],[7,\"h1\"],[11,\"class\",\"display-3\"],[9],[10],[0,\"\\n      \"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"col-12\"],[9],[0,\"\\n      \"],[7,\"h1\"],[11,\"class\",\"display-4 mt-3\"],[9],[0,\"Acknowledgement\"],[10],[0,\"\\n\\n      \"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[0,\"Thank you to all who supported us!\"],[10],[0,\"\\n\\n      \"],[7,\"div\"],[11,\"class\",\"d-flex flex-wrap justify-content-around\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"sponsors\"]]],null,{\"statements\":[[0,\"          \"],[1,[27,\"sponsor-thumbnail\",null,[[\"model\"],[[22,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/acknowledgement.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "d2kCfWg7",
    "block": "{\"symbols\":[],\"statements\":[[7,\"header\"],[9],[0,\"\\n  \"],[1,[27,\"component\",[\"nav-bar\"],null],false],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"main\"],[11,\"role\",\"main\"],[11,\"class\",\"pb-3\"],[9],[0,\"\\n  \"],[1,[21,\"outlet\"],false],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"footer\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container py-3\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col-12\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"text-center mt-3\"],[9],[0,\"\\n          Email:\\n          \"],[7,\"a\"],[11,\"href\",\"mailto:netlab@caltech.edu\"],[9],[0,\"netlab@caltech.edu\"],[10],[0,\"\\n        \"],[10],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"d-flex justify-content-center logos\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"d-flex align-items-center mr-3\"]],{\"statements\":[[0,\"            \"],[7,\"img\"],[11,\"src\",\"/assets/images/netlab-logo.png\"],[11,\"class\",\"logo netlab mx-3 img-fluid\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[7,\"a\"],[11,\"href\",\"http://www.caltech.edu\"],[11,\"class\",\"d-flex align-items-center\"],[9],[0,\"\\n            \"],[7,\"img\"],[11,\"src\",\"/assets/images/caltech-logo-white.png\"],[11,\"class\",\"logo caltech img-fluid\"],[9],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n        \"],[7,\"p\"],[11,\"class\",\"text-center\"],[9],[0,\"\\n          \"],[7,\"a\"],[11,\"href\",\"http://eas.caltech.edu\"],[9],[0,\"\\n            \"],[7,\"img\"],[11,\"src\",\"/assets/images/eas-allcaps-oneliner-white.png\"],[11,\"alt\",\"eas oneliner logo\"],[11,\"class\",\"logo eas img-fluid\"],[9],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n        \"],[7,\"p\"],[11,\"class\",\"text-center\"],[9],[0,\"\\n          \"],[7,\"small\"],[9],[0,\"\\n            1200 E California Blvd, MC 305-16 Pasadena, CA 91125-8000, USA\\n            \"],[7,\"br\"],[9],[10],[0,\"\\n            Copyright © 2008-2017. Netlab, \"],[7,\"a\"],[11,\"href\",\"http://cms.caltech.edu\"],[9],[0,\"Computing and Mathematical Sciences\"],[10],[0,\". All rights reserved.\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/components/current-member-card", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "ikQEiJs3",
    "block": "{\"symbols\":[\"paragraph\"],\"statements\":[[7,\"div\"],[11,\"class\",\"profile card my-3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"profile d-flex flex-row card border-0\"],[9],[0,\"\\n    \"],[7,\"div\"],[12,\"class\",[28,[\"image \",[27,\"profile-image-class\",[[23,[\"model\",\"imageClass\"]]],null]]]],[9],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"card-body\"],[9],[0,\"\\n      \"],[7,\"h4\"],[9],[0,\"\\n        \"],[1,[23,[\"model\",\"name\"]],false],[0,\"\\n\"],[4,\"if\",[[23,[\"model\",\"shared\"]]],null,{\"statements\":[[0,\"          \"],[7,\"small\"],[9],[0,\"(with \"],[1,[23,[\"model\",\"shared\"]],false],[0,\")\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[10],[0,\"\\n      \"],[7,\"p\"],[11,\"class\",\"card-text\"],[9],[0,\"\\n        \"],[1,[23,[\"model\",\"position\"]],false],[0,\"\\n        \"],[7,\"br\"],[9],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"model\",\"duration\"]]],null,{\"statements\":[[0,\"          \"],[1,[23,[\"model\",\"duration\"]],false],[0,\"\\n          \"],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"model\",\"link\"]]],null,{\"statements\":[[0,\"          \"],[7,\"a\"],[11,\"class\",\"card-link\"],[12,\"href\",[28,[[23,[\"model\",\"link\"]]]]],[9],[0,\"Website\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"model\",\"cv\"]]],null,{\"statements\":[[0,\"          \"],[7,\"a\"],[11,\"class\",\"card-link\"],[12,\"href\",[28,[[23,[\"model\",\"cv\"]]]]],[9],[0,\"CV\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"model\",\"research\"]]],null,{\"statements\":[[0,\"    \"],[7,\"div\"],[11,\"class\",\"research card-body\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"research\"]]],null,{\"statements\":[[0,\"        \"],[7,\"p\"],[11,\"class\",\"card-text\"],[9],[1,[22,1,[]],false],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/components/current-member-card.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/components/list-pagination", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "kigWyCoL",
    "block": "{\"symbols\":[\"pageNumber\"],\"statements\":[[7,\"nav\"],[11,\"aria-label\",\"publication pagination\"],[9],[0,\"\\n  \"],[7,\"ul\"],[11,\"class\",\"pagination justify-content-center\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"showPrevious\"]]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[11,\"class\",\"page-item\"],[9],[7,\"a\"],[11,\"class\",\"page-link\"],[3,\"action\",[[22,0,[]],\"previousClicked\"]],[9],[1,[21,\"previousText\"],false],[10],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[7,\"li\"],[11,\"class\",\"page-item disabled\"],[9],[7,\"a\"],[11,\"class\",\"page-link\"],[11,\"href\",\"#\"],[9],[1,[21,\"previousText\"],false],[10],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[4,\"each\",[[23,[\"pageNumbers\"]]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[12,\"class\",[28,[\"page-item \",[27,\"if\",[[27,\"eq\",[[22,1,[]],[23,[\"currentPage\"]]],null],\"active\",\"\"],null]]]],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"class\",\"page-link\"],[3,\"action\",[[22,0,[]],\"pageClicked\",[22,1,[]]]],[9],[0,\"\\n          \"],[1,[22,1,[]],false],[0,\"\\n\"],[4,\"if\",[[27,\"eq\",[[22,1,[]],[23,[\"currentPage\"]]],null]],null,{\"statements\":[[0,\"            \"],[7,\"span\"],[11,\"class\",\"sr-only\"],[9],[0,\"(current)\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\"],[4,\"if\",[[23,[\"showNext\"]]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[11,\"class\",\"page-item\"],[9],[7,\"a\"],[11,\"class\",\"page-link\"],[3,\"action\",[[22,0,[]],\"nextClicked\"]],[9],[1,[21,\"nextText\"],false],[10],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[7,\"li\"],[11,\"class\",\"page-item disabled\"],[9],[7,\"a\"],[11,\"class\",\"page-link\"],[11,\"href\",\"#\"],[9],[1,[21,\"nextText\"],false],[10],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/components/list-pagination.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/components/nav-bar", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "FPUE1vhn",
    "block": "{\"symbols\":[],\"statements\":[[7,\"nav\"],[11,\"class\",\"navbar fixed-top navbar-expand-md navbar-dark bg-dark\"],[9],[0,\"\\n  \"],[7,\"a\"],[11,\"class\",\"navbar-brand\"],[11,\"href\",\"/\"],[9],[7,\"img\"],[11,\"src\",\"/assets/images/netlab-logo.png\"],[11,\"class\",\"logo netlab\"],[9],[10],[10],[0,\"\\n  \"],[7,\"button\"],[11,\"class\",\"navbar-toggler\"],[11,\"data-toggle\",\"collapse\"],[11,\"data-target\",\"#navbarToggler\"],[11,\"aria-controls\",\"navbarToggler\"],[11,\"aria-expanded\",\"false\"],[11,\"aria-label\",\"Toggle navigation\"],[11,\"type\",\"button\"],[3,\"action\",[[22,0,[]],\"showSubMenus\"]],[9],[0,\"\\n    \"],[7,\"span\"],[11,\"class\",\"navbar-toggler-icon\"],[9],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"collapse navbar-collapse justify-content-end\"],[11,\"id\",\"navbarToggler\"],[9],[0,\"\\n    \"],[7,\"ul\"],[11,\"class\",\"navbar-nav mt-2 mt-md-0\"],[9],[0,\"\\n\"],[4,\"nav-item\",null,null,{\"statements\":[[4,\"link-to\",[\"index\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Home\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"nav-item\",null,null,{\"statements\":[[4,\"link-to\",[\"research\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Research\\n\"]],\"parameters\":[]},null],[0,\"        \"],[7,\"ul\"],[11,\"class\",\"sub-nav bg-dark\"],[9],[0,\"\\n\"],[4,\"nav-item\",null,null,{\"statements\":[[4,\"link-to\",[\"research.power-systems-steady-state\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"               Power Systems Steady State\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"nav-item\",null,null,{\"statements\":[[4,\"link-to\",[\"research.power-systems-dynamics\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"               Power Systems Dynamics\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"nav-item\",null,null,{\"statements\":[[4,\"link-to\",[\"research.electric-vehicles\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"               Electric Vehicles\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"nav-item\",null,null,{\"statements\":[[4,\"link-to\",[\"research.communication-networks\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"               Communication Networks\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"        \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"nav-item\",null,null,{\"statements\":[[4,\"link-to\",[\"people\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          People\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"nav-item\",null,null,{\"statements\":[[4,\"link-to\",[\"publications\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Publications\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"nav-item\",null,null,{\"statements\":[[4,\"link-to\",[\"presentations\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Presentations\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"nav-item\",null,null,{\"statements\":[[4,\"link-to\",[\"acknowledgement\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Acknowledgement\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/components/nav-bar.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/components/nav-item", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "OQ76JAlj",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/components/nav-item.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/components/previous-member-card", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "mPGb+Z55",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"card\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"card-body\"],[9],[0,\"\\n    \"],[7,\"strong\"],[9],[0,\"\\n      \"],[1,[23,[\"model\",\"name\"]],false],[0,\"\\n\"],[4,\"if\",[[23,[\"model\",\"shared\"]]],null,{\"statements\":[[0,\"        \"],[7,\"small\"],[9],[0,\"(with \"],[1,[23,[\"model\",\"shared\"]],false],[0,\")\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"model\",\"duration\"]]],null,{\"statements\":[[0,\"      \"],[7,\"span\"],[11,\"class\",\"float-right\"],[9],[1,[23,[\"model\",\"duration\"]],false],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[7,\"p\"],[11,\"class\",\"card-text\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"model\",\"degree\"]]],null,{\"statements\":[[0,\"        \"],[7,\"small\"],[9],[0,\"\\n          \"],[1,[23,[\"model\",\"degree\"]],false],[0,\"\\n\"],[4,\"if\",[[23,[\"model\",\"degree_university\"]]],null,{\"statements\":[[0,\"            (\"],[1,[23,[\"model\",\"degree_university\"]],false],[0,\")\\n\"]],\"parameters\":[]},null],[0,\"        \"],[10],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"model\",\"department\"]]],null,{\"statements\":[[0,\"        \"],[7,\"small\"],[9],[1,[23,[\"model\",\"department\"]],false],[10],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"model\",\"university\"]]],null,{\"statements\":[[0,\"        \"],[7,\"small\"],[9],[1,[23,[\"model\",\"university\"]],false],[10],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"model\",\"current\"]]],null,{\"statements\":[[0,\"        \"],[7,\"small\"],[9],[1,[23,[\"model\",\"current\"]],false],[10],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"model\",\"link\"]]],null,{\"statements\":[[0,\"        \"],[7,\"small\"],[9],[7,\"a\"],[12,\"href\",[28,[[23,[\"model\",\"link\"]]]]],[9],[0,\"Profile\"],[10],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/components/previous-member-card.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/components/publication-item", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "hT7cU6Tv",
    "block": "{\"symbols\":[\"creator\"],\"statements\":[[4,\"each\",[[23,[\"model\",\"creators\"]]],null,{\"statements\":[[0,\"  \"],[1,[22,1,[\"name\",\"family\"]],false],[0,\", \"],[1,[22,1,[\"name\",\"given\"]],false],[0,\" \"],[4,\"unless\",[[27,\"eq\",[[22,1,[]],[23,[\"model\",\"creators\",\"lastObject\"]]],null]],null,{\"statements\":[[0,\"and \"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"(\"],[1,[27,\"string-slice\",[[23,[\"model\",\"date\"]],0,4],null],false],[0,\")\\n\"],[7,\"a\"],[12,\"href\",[28,[[21,\"uri\"]]]],[11,\"target\",\"_blank\"],[9],[7,\"em\"],[9],[1,[23,[\"model\",\"title\"]],false],[0,\".\"],[10],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"model\",\"event_title\"]]],null,{\"statements\":[[0,\"  In: \"],[4,\"if\",[[23,[\"model\",\"book_title\"]]],null,{\"statements\":[[0,\" \"],[1,[23,[\"model\",\"book_title\"]],false]],\"parameters\":[]},{\"statements\":[[1,[23,[\"model\",\"publication\"]],false]],\"parameters\":[]}],[0,\".\\n  \"],[1,[23,[\"model\",\"publisher\"]],false],[0,\", \"],[1,[23,[\"model\",\"place_of_pub\"]],false],[4,\"if\",[[23,[\"model\",\"pagerange\"]]],null,{\"statements\":[[0,\", pp. \"],[1,[23,[\"model\",\"pagerange\"]],false]],\"parameters\":[]},null],[0,\".\\n  ISBN \"],[1,[23,[\"model\",\"isbn\"]],false],[0,\".\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[23,[\"model\",\"isbn\"]]],null,{\"statements\":[[0,\"  \"],[4,\"if\",[[23,[\"model\",\"book_title\"]]],null,{\"statements\":[[0,\" \"],[1,[23,[\"model\",\"book_title\"]],false]],\"parameters\":[]},{\"statements\":[[1,[23,[\"model\",\"publication\"]],false]],\"parameters\":[]}],[0,\".\\n  \"],[4,\"if\",[[23,[\"model\",\"number\"]]],null,{\"statements\":[[0,\" No. \"],[1,[23,[\"model\",\"number\"]],false],[0,\".\"]],\"parameters\":[]},null],[0,\"\\n  \"],[1,[23,[\"model\",\"publisher\"]],false],[0,\", \"],[1,[23,[\"model\",\"place_of_pub\"]],false],[4,\"if\",[[23,[\"model\",\"pagerange\"]]],null,{\"statements\":[[0,\", pp. \"],[1,[23,[\"model\",\"pagerange\"]],false]],\"parameters\":[]},null],[0,\".\\n  ISBN \"],[1,[23,[\"model\",\"isbn\"]],false],[0,\".\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[23,[\"model\",\"issn\"]]],null,{\"statements\":[[0,\"  \"],[1,[23,[\"model\",\"publication\"]],false],[4,\"if\",[[23,[\"model\",\"volume\"]]],null,{\"statements\":[[0,\", \"],[1,[23,[\"model\",\"volume\"]],false],[0,\" \"],[4,\"if\",[[23,[\"model\",\"number\"]]],null,{\"statements\":[[0,\"(\"],[1,[23,[\"model\",\"number\"]],false],[0,\")\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\".\\n  \"],[4,\"if\",[[23,[\"model\",\"pagerange\"]]],null,{\"statements\":[[0,\"pp. \"],[1,[23,[\"model\",\"pagerange\"]],false],[0,\".\"]],\"parameters\":[]},null],[0,\"\\n  ISSN \"],[1,[23,[\"model\",\"issn\"]],false],[0,\".\\n\"]],\"parameters\":[]},null]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"\\n\"],[4,\"if\",[[23,[\"model\",\"ispublished\"]]],null,{\"statements\":[[4,\"if\",[[27,\"eq\",[[23,[\"model\",\"ispublished\"]],\"inpress\"],null]],null,{\"statements\":[[0,\"    (In Press)\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[27,\"eq\",[[23,[\"model\",\"ispublished\"]],\"pub\"],null]],null,{\"statements\":[],\"parameters\":[]},{\"statements\":[[4,\"if\",[[27,\"eq\",[[23,[\"model\",\"ispublished\"]],\"unpub\"],null]],null,{\"statements\":[[0,\"    \"],[4,\"if\",[[23,[\"model\",\"publisher\"]]],null,{\"statements\":[[1,[23,[\"model\",\"publisher\"]],false],[0,\", \"]],\"parameters\":[]},null],[1,[23,[\"model\",\"place_of_pub\"]],false],[0,\".\\n    (Unpublished)\\n  \"]],\"parameters\":[]},null]],\"parameters\":[]}]],\"parameters\":[]}]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/components/publication-item.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/components/publication-list", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "5I6gsqFE",
    "block": "{\"symbols\":[\"publication\"],\"statements\":[[4,\"if\",[[23,[\"publications\",\"loaded\"]]],null,{\"statements\":[[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[1,[27,\"publication-item\",null,[[\"model\",\"class\"],[[22,1,[]],\"file\"]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[7,\"p\"],[9],[0,\"Loading..\"],[7,\"i\"],[11,\"class\",\"fa fa-circle-o-notch fa-spin\"],[11,\"aria-hidden\",\"true\"],[9],[10],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/components/publication-list.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/components/resource-blog-row", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "3B4PveuL",
    "block": "{\"symbols\":[\"subject\",\"post\",\"post\"],\"statements\":[[7,\"td\"],[9],[0,\"\\n\"],[4,\"if\",[[27,\"eq\",[[23,[\"model\",\"subjects\",\"length\"]],1],null]],null,{\"statements\":[[4,\"let\",[[23,[\"model\",\"subjects\",\"lastObject\"]]],null,{\"statements\":[[0,\"      \"],[7,\"span\"],[11,\"class\",\"resource-links\"],[9],[0,\"\\n        \"],[7,\"span\"],[9],[0,\"\\n          \"],[7,\"a\"],[12,\"href\",[28,[[22,3,[\"link\"]]]]],[11,\"target\",\"_blank\"],[9],[1,[23,[\"model\",\"title\"]],false],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[3]},null]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[7,\"strong\"],[9],[1,[23,[\"model\",\"title\"]],false],[10],[0,\"\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n    \"],[7,\"ul\"],[11,\"class\",\"resource-links mb-0\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"subjects\"]]],null,{\"statements\":[[0,\"        \"],[7,\"li\"],[9],[0,\"\\n          \"],[1,[22,1,[\"subject\"]],false],[0,\":\\n\"],[4,\"each\",[[22,1,[\"posts\"]]],null,{\"statements\":[[0,\"            \"],[7,\"span\"],[9],[0,\"\\n              \"],[7,\"a\"],[12,\"href\",[28,[[22,2,[\"link\"]]]]],[11,\"target\",\"_blank\"],[9],[1,[22,2,[\"text\"]],false],[10],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[10],[0,\"\\n\"]],\"parameters\":[]}],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/components/resource-blog-row.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/components/resource-talk-row", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "LkOJ2dtN",
    "block": "{\"symbols\":[\"location\",\"resource\",\"resource\"],\"statements\":[[7,\"td\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[1,[23,[\"model\",\"title\"]],false],[10],[0,\"\\n  \"],[7,\"br\"],[9],[10],[0,\"\\n\"],[4,\"if\",[[27,\"eq\",[[23,[\"model\",\"locations\",\"length\"]],1],null]],null,{\"statements\":[[0,\"    \"],[1,[23,[\"model\",\"locations\",\"lastObject\",\"description\"]],false],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"resource-links\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"locations\",\"lastObject\",\"resources\"]]],null,{\"statements\":[[0,\"        \"],[7,\"span\"],[9],[0,\"\\n          \"],[7,\"a\"],[12,\"href\",[28,[[22,3,[\"link\"]]]]],[11,\"target\",\"_blank\"],[9],[1,[22,3,[\"text\"]],false],[10],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"    \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[7,\"ul\"],[11,\"class\",\"resource-links mb-0\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"locations\"]]],null,{\"statements\":[[0,\"        \"],[7,\"li\"],[9],[0,\"\\n          \"],[1,[22,1,[\"description\"]],false],[0,\"\\n          \"],[7,\"br\"],[9],[10],[0,\"\\n\"],[4,\"each\",[[22,1,[\"resources\"]]],null,{\"statements\":[[0,\"            \"],[7,\"span\"],[9],[0,\"\\n              \"],[7,\"a\"],[12,\"href\",[28,[[22,2,[\"link\"]]]]],[11,\"target\",\"_blank\"],[9],[1,[22,2,[\"text\"]],false],[10],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[10],[0,\"\\n\"]],\"parameters\":[]}],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/components/resource-talk-row.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/components/sponsor-thumbnail", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "NyhA8E0J",
    "block": "{\"symbols\":[],\"statements\":[[7,\"a\"],[11,\"class\",\"logo-link small img-thumbnail d-flex align-items-center justify-content-center mb-3\"],[12,\"href\",[28,[[23,[\"model\",\"link\"]]]]],[11,\"target\",\"_blank\"],[9],[0,\"\\n  \"],[7,\"div\"],[12,\"class\",[28,[\"image-container \",[23,[\"model\",\"imageClass\"]]]]],[9],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/components/sponsor-thumbnail.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "Qw4FFxn5",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"bg-gray mb-3 add-hero-padding\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container py-3\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col-12 my-3\"],[9],[0,\"\\n        \"],[7,\"h2\"],[11,\"class\",\"sr-only\"],[9],[0,\"Research\"],[10],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"researches row\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"research col-md-3 col-lg-3 my-3\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"research.power-systems-steady-state\"],null,{\"statements\":[[0,\"              \"],[7,\"div\"],[11,\"class\",\"research-content-container\"],[9],[0,\"\\n                \"],[7,\"div\"],[11,\"class\",\"bg-psss clickable\"],[9],[0,\"\\n                  \"],[7,\"h4\"],[9],[0,\"Power Systems: Steady State\"],[10],[0,\"\\n                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[10],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"research col-md-3 col-lg-3 my-3\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"research.power-systems-dynamics\"],null,{\"statements\":[[0,\"              \"],[7,\"div\"],[11,\"class\",\"research-content-container\"],[9],[0,\"\\n                \"],[7,\"div\"],[11,\"class\",\"bg-power-systems-dynamics clickable\"],[9],[0,\"\\n                  \"],[7,\"h4\"],[9],[0,\"Power Systems: Dynamics\"],[10],[0,\"\\n                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[10],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"research col-md-3 col-lg-3 my-3\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"research.electric-vehicles\"],null,{\"statements\":[[0,\"              \"],[7,\"div\"],[11,\"class\",\"research-content-container\"],[9],[0,\"\\n                \"],[7,\"div\"],[11,\"class\",\"bg-electric-vehicles clickable\"],[9],[0,\"\\n                  \"],[7,\"h4\"],[9],[0,\"Electric Vehicles (EV)\"],[10],[0,\"\\n                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[10],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"research col-md-3 col-lg-3 my-3\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"research.communication-networks\"],null,{\"statements\":[[0,\"              \"],[7,\"div\"],[11,\"class\",\"research-content-container\"],[9],[0,\"\\n                \"],[7,\"div\"],[11,\"class\",\"bg-communication-networks clickable\"],[9],[0,\"\\n                  \"],[7,\"h4\"],[9],[0,\"Communication Networks\"],[10],[0,\"\\n                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"container my-3 py-3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"id\",\"publications\"],[11,\"class\",\"col-lg-12\"],[9],[0,\"\\n      \"],[7,\"h2\"],[11,\"class\",\"text-lg-center\"],[9],[0,\"Recent Publications\"],[10],[0,\"\\n      \"],[1,[27,\"publication-list\",null,[[\"model\"],[[23,[\"recent\"]]]]],false],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/index.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/people", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "O2kcHzl5",
    "block": "{\"symbols\":[\"person\",\"person\",\"person\",\"person\",\"person\",\"person\",\"person\",\"person\",\"person\",\"person\",\"model\"],\"statements\":[[7,\"div\"],[11,\"class\",\"jumbotron jumbotron-people-banner jumbotron-fluid\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"jumbotron-content text-light\"],[9],[0,\"\\n      \"],[7,\"h1\"],[11,\"class\",\"display-3\"],[9],[10],[0,\"\\n      \"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"col-12\"],[9],[0,\"\\n      \"],[7,\"h1\"],[11,\"class\",\"display-4 mt-3\"],[9],[0,\"People\"],[10],[0,\"\\n\\n      \"],[7,\"section\"],[11,\"id\",\"faculty\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n        \"],[7,\"h2\"],[11,\"class\",\"mt-3\"],[9],[0,\"Faculty\"],[10],[0,\"\\n\\n\"],[4,\"let\",[[27,\"hash\",null,[[\"name\",\"imageClass\",\"position\",\"cv\"],[\"Steven H. Low\",\"steven-low\",\"F. J. Gilloon Professor of Computing and Mathematical Sciences and Electrical Engineering\",\"/assets/documents/LowCV.pdf\"]]]],null,{\"statements\":[[0,\"          \"],[1,[27,\"current-member-card\",null,[[\"model\"],[[22,11,[]]]]],false],[0,\"\\n\"]],\"parameters\":[11]},null],[0,\"\\n        \"],[7,\"section\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n          \"],[7,\"h3\"],[11,\"class\",\"mt-3\"],[9],[0,\"Caltech Collaborators\"],[10],[0,\"\\n\"],[4,\"each\",[[23,[\"people\",\"facultyCollaborators\"]]],null,{\"statements\":[[0,\"            \"],[1,[27,\"current-member-card\",null,[[\"model\"],[[22,10,[]]]]],false],[0,\"\\n\"]],\"parameters\":[10]},null],[0,\"        \"],[10],[0,\"\\n\\n      \"],[10],[0,\"\\n\\n      \"],[7,\"section\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n        \"],[7,\"h2\"],[9],[0,\"Admin\"],[10],[0,\"\\n\\n\"],[4,\"each\",[[23,[\"people\",\"admin\"]]],null,{\"statements\":[[0,\"          \"],[1,[27,\"current-member-card\",null,[[\"model\"],[[22,9,[]]]]],false],[0,\"\\n\"]],\"parameters\":[9]},null],[0,\"\\n      \"],[10],[0,\"\\n\\n      \"],[7,\"section\"],[11,\"id\",\"current-memebers\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n        \"],[7,\"h2\"],[11,\"class\",\"my-3\"],[9],[0,\"Current Members\"],[10],[0,\"\\n\\n        \"],[7,\"section\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n          \"],[7,\"h4\"],[9],[0,\"Graduate Students\"],[10],[0,\"\\n\\n\"],[4,\"each\",[[23,[\"people\",\"graduates\"]]],null,{\"statements\":[[0,\"            \"],[1,[27,\"current-member-card\",null,[[\"model\"],[[22,8,[]]]]],false],[0,\"\\n\"]],\"parameters\":[8]},null],[0,\"        \"],[10],[0,\"\\n\\n        \"],[7,\"section\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n          \"],[7,\"h4\"],[9],[0,\"Postdoctoral Researchers\"],[10],[0,\"\\n\\n\"],[4,\"each\",[[23,[\"people\",\"postdocs\"]]],null,{\"statements\":[[0,\"            \"],[1,[27,\"current-member-card\",null,[[\"model\"],[[22,7,[]]]]],false],[0,\"\\n\"]],\"parameters\":[7]},null],[0,\"        \"],[10],[0,\"\\n\\n\"],[4,\"if\",[[27,\"or\",[[27,\"gt\",[[23,[\"people\",\"visitingPhDStudents\",\"length\"]],0],null],[27,\"gt\",[[23,[\"people\",\"visitingPostdocs\",\"length\"]],0],null]],null]],null,{\"statements\":[[0,\"          \"],[7,\"section\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n            \"],[7,\"h4\"],[9],[0,\"Visiting Students\"],[10],[0,\"\\n\\n\"],[4,\"each\",[[23,[\"people\",\"visitingPhDStudents\"]]],null,{\"statements\":[[0,\"              \"],[1,[27,\"current-member-card\",null,[[\"model\"],[[22,6,[]]]]],false],[0,\"\\n\"]],\"parameters\":[6]},null],[0,\"\\n\"],[4,\"each\",[[23,[\"people\",\"visitingPostdocs\"]]],null,{\"statements\":[[0,\"              \"],[1,[27,\"current-member-card\",null,[[\"model\"],[[22,5,[]]]]],false],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"        \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n      \"],[10],[0,\"\\n\\n      \"],[7,\"section\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n        \"],[7,\"h2\"],[11,\"class\",\"my-3\"],[9],[0,\"Previous Members\"],[10],[0,\"\\n\\n        \"],[7,\"section\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n          \"],[7,\"h4\"],[9],[0,\"Postdoctoral Researchers\"],[10],[0,\"\\n\\n          \"],[7,\"div\"],[11,\"class\",\"card-columns flex-lg-wrap visitors\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"people\",\"pastPostdocs\"]]],null,{\"statements\":[[0,\"              \"],[1,[27,\"previous-member-card\",null,[[\"model\"],[[22,4,[]]]]],false],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\\n        \"],[7,\"section\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n          \"],[7,\"h4\"],[9],[0,\"Graduate Students\"],[10],[0,\"\\n\\n          \"],[7,\"div\"],[11,\"class\",\"card-columns flex-lg-wrap visitors\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"people\",\"pastGraduateStudents\"]]],null,{\"statements\":[[0,\"              \"],[1,[27,\"previous-member-card\",null,[[\"model\"],[[22,3,[]]]]],false],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\\n        \"],[7,\"h4\"],[11,\"class\",\"my-3\"],[9],[0,\"Visitors\"],[10],[0,\"\\n\\n        \"],[7,\"section\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n          \"],[7,\"h5\"],[9],[0,\"Faculty\"],[10],[0,\"\\n\\n          \"],[7,\"div\"],[11,\"class\",\"card-columns flex-lg-wrap visitors\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"people\",\"pastVisitingFaculty\"]]],null,{\"statements\":[[0,\"              \"],[1,[27,\"previous-member-card\",null,[[\"model\"],[[22,2,[]]]]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\\n        \"],[7,\"section\"],[11,\"class\",\"py-3\"],[9],[0,\"\\n          \"],[7,\"h5\"],[9],[0,\"Ph.D. Students\"],[10],[0,\"\\n\\n          \"],[7,\"div\"],[11,\"class\",\"card-columns flex-lg-wrap visitors\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"people\",\"pastVisitingPhDStudents\"]]],null,{\"statements\":[[0,\"              \"],[1,[27,\"previous-member-card\",null,[[\"model\"],[[22,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/people.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/presentations", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "gG1PNF2b",
    "block": "{\"symbols\":[\"blogPost\",\"talk\"],\"statements\":[[7,\"div\"],[11,\"class\",\"jumbotron jumbotron-resources-banner jumbotron-fluid\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"jumbotron-content text-light\"],[9],[0,\"\\n      \"],[7,\"h1\"],[11,\"class\",\"display-3\"],[9],[10],[0,\"\\n      \"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"col-12\"],[9],[0,\"\\n      \"],[7,\"h1\"],[11,\"class\",\"display-4 mt-3\"],[9],[0,\"Presentations\"],[10],[0,\"\\n\\n      \"],[7,\"div\"],[11,\"class\",\"accordion\"],[11,\"id\",\"resourceAccordion\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"card\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"card-header\"],[11,\"id\",\"psResources\"],[9],[0,\"\\n            \"],[7,\"h5\"],[11,\"class\",\"mb-0\"],[9],[0,\"\\n              \"],[7,\"button\"],[11,\"class\",\"btn btn-link w-100\"],[11,\"data-toggle\",\"collapse\"],[11,\"data-target\",\"#collapsePS\"],[11,\"aria-expanded\",\"true\"],[11,\"aria-controls\",\"collapsePS\"],[11,\"type\",\"button\"],[9],[0,\"Talks\"],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n\\n          \"],[7,\"div\"],[11,\"id\",\"collapsePS\"],[11,\"class\",\"collapse show\"],[11,\"aria-labelledby\",\"psResources\"],[11,\"data-parent\",\"#resourceAccordion\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"card-body\"],[9],[0,\"\\n              \"],[7,\"section\"],[9],[0,\"\\n                \"],[7,\"table\"],[11,\"class\",\"table\"],[9],[0,\"\\n                  \"],[7,\"tbody\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"talks\"]]],null,{\"statements\":[[0,\"                      \"],[1,[27,\"resource-talk-row\",null,[[\"model\"],[[22,2,[]]]]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"                  \"],[10],[0,\"\\n                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\\n        \"],[7,\"div\"],[11,\"class\",\"card\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"card-header\"],[11,\"id\",\"blogResources\"],[9],[0,\"\\n            \"],[7,\"h5\"],[11,\"class\",\"mb-0\"],[9],[0,\"\\n              \"],[7,\"button\"],[11,\"class\",\"btn btn-link w-100\"],[11,\"data-toggle\",\"collapse\"],[11,\"data-target\",\"#collapseBlog\"],[11,\"aria-expanded\",\"true\"],[11,\"aria-controls\",\"collapseBlog\"],[11,\"type\",\"button\"],[9],[0,\"Blogs\"],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n\\n          \"],[7,\"div\"],[11,\"id\",\"collapseBlog\"],[11,\"class\",\"collapse\"],[11,\"aria-labelledby\",\"blogResources\"],[11,\"data-parent\",\"#resourceAccordion\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"card-body\"],[9],[0,\"\\n              \"],[7,\"table\"],[11,\"class\",\"table\"],[9],[0,\"\\n                \"],[7,\"tbody\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"blogPosts\"]]],null,{\"statements\":[[0,\"                    \"],[1,[27,\"resource-blog-row\",null,[[\"model\"],[[22,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/presentations.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/publications", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "iPeillq7",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"jumbotron jumbotron-publications-banner jumbotron-fluid\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"jumbotron-content text-light\"],[9],[0,\"\\n      \"],[7,\"h1\"],[11,\"class\",\"display-3\"],[9],[10],[0,\"\\n      \"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"col-12\"],[9],[0,\"\\n      \"],[7,\"h1\"],[11,\"class\",\"display-4 mt-3\"],[9],[0,\"Publications\"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"publications\",\"loaded\"]]],null,{\"statements\":[[0,\"        \"],[1,[27,\"list-pagination\",null,[[\"paginateBy\",\"total\",\"currentPage\"],[[27,\"readonly\",[[23,[\"limit\"]]],null],[27,\"readonly\",[[23,[\"publications\",\"publications\",\"length\"]]],null],[27,\"readonly\",[[23,[\"page\"]]],null]]]],false],[0,\"\\n        \"],[1,[27,\"publication-list\",null,[[\"model\"],[[23,[\"paginatedItems\"]]]]],false],[0,\"\\n        \"],[1,[27,\"list-pagination\",null,[[\"paginateBy\",\"total\",\"currentPage\"],[[27,\"readonly\",[[23,[\"limit\"]]],null],[27,\"readonly\",[[23,[\"publications\",\"publications\",\"length\"]]],null],[27,\"readonly\",[[23,[\"page\"]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[7,\"p\"],[9],[0,\"Loading..\"],[7,\"i\"],[11,\"class\",\"fa fa-circle-o-notch fa-spin\"],[11,\"aria-hidden\",\"true\"],[9],[10],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/publications.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/research", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "8l0qW1lh",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"jumbotron jumbotron-research-banner jumbotron-fluid\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"jumbotron-content text-light\"],[9],[0,\"\\n      \"],[7,\"h1\"],[11,\"class\",\"display-3\"],[9],[10],[0,\"\\n      \"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"col-12\"],[9],[0,\"\\n      \"],[1,[21,\"outlet\"],false],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/research.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/research/communication-networks", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "kZdCel94",
    "block": "{\"symbols\":[],\"statements\":[[7,\"h1\"],[11,\"class\",\"display-4 mt-3\"],[9],[0,\"Research\"],[10],[0,\"\\n\"],[7,\"h2\"],[11,\"class\",\"mt-3\"],[9],[0,\"Communication Networks\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[0,\"\\n  We have been focusing on Internet research roughly from 2000 to 2010 or so, working on congestion control, wireless networking, network architecture, resource allocation, topology and routing, network coding, etc. We have developed a mathematical theory of Internet congestion control, developed practical algorithms, built a novel experimental facility (WAN-in-Lab), and transferred our research to the marketplace. Our research FastTCP has been accelerating more than 1TB of Internet traffic every second circa 2014. See the Publications page for the full range of our work. In the following, we highlight some of our results in congestion control.\\n\"],[10],[0,\"\\n\\n\"],[7,\"ol\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#congestion-control\"],[9],[0,\"Congestion control\"],[10],[10],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#layering\"],[9],[0,\"Layering as optimization decomposition\"],[10],[10],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#other-results\"],[9],[0,\"Other interesting results\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"figure\"],[11,\"class\",\"col-lg-10 col-md-8 mx-auto\"],[9],[0,\"\\n  \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/communication-networks/FAST-timeline.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n    \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/communication-networks/FAST-timeline.png\"],[11,\"alt\",\"FAST timeline\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"\\n    Caltech FAST Project: FAST TCP accelerating > 1TB of Internet traffic every second (2014).\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"congestion-control\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Congestion control\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  Congestion control has been responsible for maintaining stability as the Internet scaled up in size, speed, traffic volume, coverage, and complexity by many orders of magnitude over the last four decades, especially since late 1980s (see Figure 1).\\n\\n\\n  \"],[7,\"figure\"],[11,\"class\",\"col-md-6 float-md-right\"],[9],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/communication-networks/ESnet-backbone-bandwidth.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n      \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/communication-networks/ESnet-backbone-bandwidth.png\"],[11,\"alt\",\"ESnet backbone bandwidth graph (Mbps)\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"\\n      Figure 1: Highest link speed of US Department of Energy’s Energy Sciences Network (ESnet) from 1987 (56 kbps) to 2012 (100Gbps).\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n\\n  The Internet, called ARPANet at the time, was born in 1969 with four nodes. The Transmission Control Protocol (TCP) was published by Vinton Cert and Robert Kahn in 1974 split into TCP/IP (Transmission Control Protocol/Internet Protocol) in 1978, and deployed as a standard on the ARPANet by 1983. An Internet congestion collapse was detected in October 1986 on a 32 kbps link between the University of California Berkeley campus and the Lawrence Berkeley National Laboratory that is 400 yards away, during which the throughput dropped by a factor of almost 1,000 to 40 bps. Two years later Van Jacobson implemented and published the congestion control algorithm in 1 the Tahoe version of TCP based on an idea of Raj Jain, K.K. Ramakrishnan and Dah-Ming Chiu. Before Tahoe, there were mechanisms in TCP to prevent senders from overwhelming receivers, but no effective mechanism to prevent the senders from overwhelming the network. This was not an issue because there were few hosts, until the mid-1980s. By November 1986 the number of hosts was estimated to have grown to 5,089 but most of the backbone links have remained 50 – 56 bps (bits per second) since the beginning of the ARPANet. Jacobson’s scheme adapts sending rates to the congestion level in the network, thus preventing the senders from overwhelming the network. The algorithm worked very well over a network with relatively low transmission capacity, small delay, and few random packet losses. This was mostly the case in the 1990s, but as the network speed underwent rapid upgrades (see Figure 1), as Internet exploded onto the global scene beyond research and education, and as wireless infrastructure was integrated with and mobile services proliferated on the Internet, the strain on the original design started to show.\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  This motivated a flurry of research activities on TCP congestion control in the 1990s. A mathematical understanding of Internet congestion control started in the late 1990s with Frank Kelly’s work on network utility maximization. An intensive effort ensued and lasted for a decade, in which we developed a mathematical theory to reverse engineer existing algorithms and understand structural properties of large-scale networks under end-to-end congestion control, systematically designed new algorithms based on analytical insights, and deployed some of these innovations in the field.\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"A personal account of that effort, focusing on the theory development at Netlab, is summarized in:\"],[10],[0,\"\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. H. Low. \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Low-201707-CCbook.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Analytical methods for network congestion control\"],[10],[0,\", \"],[7,\"em\"],[9],[0,\"Synthesis Lectures on Communication Networks\"],[10],[0,\", Morgan and Claypool Publishers, July 2017\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  It develops a coherent theory of Internet congestion control from the ground up to help understand and design the equilibrium and stability properties of large-scale networks under end-to-end control. It also demonstrates in depth the entire process of understanding a physical system, building mathematical models of the system, analyzing the models, exploring the practical implications of the analysis, and using the insights to improve a design.\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"Duality model of congestion control.\"],[10],[0,\"\\n  Our work on congestion control started in the late 1990s at the University of Melbourne, as reported in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. H. Low and D. E. Lapsley.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/811451/\"],[11,\"target\",\"_blank\"],[9],[0,\"Optimization flow control, I: basic algorithm and convergence\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE/ACM Transactions on Networking\"],[10],[0,\",\\n    7(6):861-75, Dec 1999\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/1224453/\"],[11,\"target\",\"_blank\"],[9],[0,\"A duality model of TCP and queue management algorithms\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE/ACM Transactions on Networking\"],[10],[0,\",\\n    11(4):525-536, Aug 2003\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  where we interpret Internet congestion control simply as a gradient projection algorithm carried out by TCP sources and queue management mechanisms over the Internet in real time to solve the dual of a utility maximization problem. It also proves that, provided that the stepsize of the algorithm is small enough, the system will converge even in an asynchronous setting with heterogeneous feedback delays where TCP sources and queue management mechanisms take actions at different times, with different frequencies and using possibly outdated information. This model is applied to understand the delay-based protocol TCP Vegas in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. H. Low, Larry Peterson and Limin Wang.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Low-200203-vegas.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Understanding Vegas: A Duality Model\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Journal of ACM\"],[10],[0,\",\\n    49(2):207-235, Mar 2002\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"and has motivated a new active queue management (AQM) algorithm:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. Athuraliya, V. H. Li, S. H. Low and Q. Yin.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/923940/\"],[11,\"target\",\"_blank\"],[9],[0,\"REM: Active Queue Management\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Network\"],[10],[0,\",\\n    15(3):48-53, May/Jun 2001\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"Control theoretic analysis.\"],[10],[0,\"\\n  I then moved to Caltech in 2000 to work with John Doyle and Fernando Paganini to develop a more refined understanding of the impact of feedback delay on the stability properties of TCP algorithms using control theory. An application of this theory to TCP Reno is reported in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. H. Low, F. Paganini, J.Wang and J. C. Doyle.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Low-200312-TCPstability-CompNet.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Linear stability of TCP/RED and a Scalable Control\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Computer Networks Journal\"],[10],[0,\",\\n    43(5):633-647, Dec 2003\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  that shows that Reno can lose stability when feedback delay increases, or, more strikingly, when link capacity increases. In stark contrast, a scalable TCP/AQM algorithm that maintains linear stability for arbitrary feedback delay and arbitrary link capacity is proposed in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    F. Paganini, Z.Wang, J. C. Doyle and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/1402470/\"],[11,\"target\",\"_blank\"],[9],[0,\"Congestion control for high performance, stability and fairness in general networks\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE/ACM Transactions on Networking\"],[10],[0,\",\\n    13(1):43-56, Feb 2005\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"figure\"],[11,\"class\",\"col-lg-5 col-md-6 col-sm-12 mx-auto\"],[9],[0,\"\\n  \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/communication-networks/nyquist-plots.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n    \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/communication-networks/nyquist-plots.png\"],[11,\"alt\",\"Nyquist plots\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"\\n    Nyquist plots\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"This series of work is summarized in the tutorial:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. H. Low, F. Paganini and J. C. Doyle.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/980245/\"],[11,\"target\",\"_blank\"],[9],[0,\"Internet congestion control\"],[10],[0,\".\\n    \"],[7,\"em\"],[9],[0,\"IEEE Control Systems Magazine\"],[10],[0,\",\\n    22(1):28-43, Feb 2002\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"FAST TCP.\"],[10],[0,\"\\n  An important insight from the control-theoretic analysis above is that the dynamics of queueing delay has exactly the right scaling with respect to network capacity. This means that queueing delay as a congestion measure has the distinct advantage of helping maintain stability as a network scales up in capacity, in contrast to the behavior of TCP Reno. This motivates our delay-based FAST TCP protocol for high-speed long-latency networks, reported in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    David X. Wei, Cheng Jin, Steven H. Low and Sanjay Hegde.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/4032738/\"],[11,\"target\",\"_blank\"],[9],[0,\"FAST TCP: motivation, architecture, algorithms, performance\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE/ACM Transactions on Networking\"],[10],[0,\",\\n    14(6):1246-1259, Dec 2006\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  We started to work with high-energy physics professor Harvey Newman of Caltech in 2002. Our first and stunning demonstration of FAST TCP was Caltech’s first participation in Internet Land Speed Record at SuperComputing Conference in November 2002, organized by Newman and his multi-institution high-energy physics team. The results of the global experiment at SC2002 are reported in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    C. Jin, D. X. Wei, S. H. Low, G. Buhrmaster, J. Bunn, D. H. Choe, R. L. A. Cottrell, J. C. Doyle, W. Feng, O. Martin, H. Newman, F. Paganini, S. Ravot and S. Singh.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/1383434/\"],[11,\"target\",\"_blank\"],[9],[0,\"FAST TCP: From Theory to Experiments\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\" IEEE Network\"],[10],[0,\",\\n    19(1):4-11, Jan/Feb 2005\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-7 col-12 mx-auto\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/communication-networks/FAST-TCP-network-setup.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/communication-networks/FAST-TCP-network-setup.png\"],[11,\"alt\",\"Network setup in SC 2002, Baltimore, Maryland, November 16–22, 2002. Distance between Sunnyvale and Geneva is 10,037\\nkm; that between Sunnyvale and Baltimore is 3948 km.\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"Network setup in SC 2002, Baltimore, Maryland, November 16–22, 2002.\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-9 col-sm-12 mx-auto\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/communication-networks/FAST-TCP-aggregate-throughput-traces.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/communication-networks/FAST-TCP-aggregate-throughput-traces.png\"],[11,\"alt\",\"Aggregate throughput traces of two flows. From left: Linux (txqueuelen = 100), Linux (txqueuelen = 10,000), FAST (txqueuelen = 100); x-axis is time, y-axis is aggregate throughput, and percentage is utilization.\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"\\n        Aggregate throughputs of two flows: Linux (default), Linux (optimized), FAST.\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  FAST TCP motivated the building of a unique university testbed WAN-in-Lab that used real carrier-class networking hardware to avoid the artifacts introduced by network simulation and emulation, while being localized to allow detailed measurement of network performance:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    George S. Lee, Lachlan L. H. Andrew, Ao Tang and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.71.1834\"],[11,\"target\",\"_blank\"],[9],[0,\"WAN-in-lab: Motivation, Deployment and Experiments\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proc. Int’l Workshop on Protocols for Fast, Long Distance Networks (PFLDnet)\"],[10],[0,\",\\n    pp. 85-90. Marina Del Rey, CA, 7-9 Feb 2007\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  Some of us took the effort to deploy our research in the real world through a startup FastSoft. Since 2014, FAST TCP has been accelerating more than 1TB of Internet traffic every second.\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-8 col-12 mx-auto\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/communication-networks/wan-in-lab.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/communication-networks/wan-in-lab.png\"],[11,\"alt\",\"wan-in-lab\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"WAN-in-LAB\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"layering\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Layering as optimization decomposition\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  TCP/AQM can be interpreted as distributed primal-dual algorithms to maximize aggregate utility over the Internet. In\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    J. Wang, L. Li, S. H. Low and J. C. Doyle.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/1458766/\"],[11,\"target\",\"_blank\"],[9],[0,\"Cross-layer optimization in TCP/IP networks\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE/ACM Transactions on Networking\"],[10],[0,\",\\n    13(3):582-568, Jun 2005\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  we show that an equilibrium of TCP/IP, if exists, maximizes aggregate utility over both source rates and routes, provided congestion prices are used as link costs. An equilibrium exists if and only if this utility maximization problem and its Lagrangian dual have no duality gap. In this case, TCP/IP incurs no penalty in not splitting traffic across multiple paths.\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  The vertical decomposition is also observed in wireless networking in\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Lijun Chen, Steven H. Low and John C. Doyle.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/1498496/\"],[11,\"target\",\"_blank\"],[9],[0,\"Joint congestion control and media access control design for wireless ad hoc networks\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proceedings of IEEE Infocom\"],[10],[0,\",\\n    pp. 2212-2222. Miami, FL, 13-17 Mar 2005\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  where a utility maximization is decomposed is not only distributed spatially, but also vertically into two protocol layers of TCP and media access control (MAC). This not only provides a systematic way to design and analyze TCP and MAC algorithms, but more importantly, makes their interaction more transparent.\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  These and other discoveries in the literature suggest a broader model of network architecture that interprets \\\"layering\\\" as \\\"optimization decomposition\\\", where a network is modeled by a generalized network utility maximization problem, each layer corresponds to a decomposed subproblem, and the interfaces among layers are functions of optimization variables coordinating the subproblems.\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Mung Chiang, S. H. Low, A. Robert Calderbank and John C. Doyle.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/4118456/\"],[11,\"target\",\"_blank\"],[9],[0,\"Layering as optimization decomposition: a mathematical theory of network architectures\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proceedings of the IEEE\"],[10],[0,\",\\n    vol. 95 pp. 255-312. Jan 2007\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  A protocol is implemented as a horizontal decomposition into distributed computation and a vertical decomposition into functional modules such as congestion control, routing, scheduling, random access, power control, and channel coding.\\n\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"other-results\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Other interesting results\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  The utility maximization model of TCP/AQM equilibrium has counter-intuitive implications analyzed in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    A. Tang, J. Wang and S. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/1621113/\"],[11,\"target\",\"_blank\"],[9],[0,\"Counter-intuitive throughput behaviors in networks under end-to-end Control\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE/ACM Transactions on Networking\"],[10],[0,\",\\n    14(2):355-368, Apr 2006\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  Whereas all examples in the literature suggest that a fair allocation is necessarily inefficient, we characterize exactly the tradeoff between fairness and throughput in general networks. The characterization leads to the first counter-example and trivially explains all the previous supporting examples. Intuitively, we might expect that increasing link capacities always raises aggregate throughput. We show that not only can throughput be reduced when some link increases its capacity, more strikingly, it can also be reduced when all links increase their capacities by the same amount. These examples demonstrate the intricate interactions among sources in a network setting that are missing in a single-link topology that was commonly used in the TCP literature.\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  When heterogeneous congestion control protocols that react to different pricing signals share the same network, the resulting equilibrium may no longer be interpreted as a solution to the standard utility maximization problem. Nonetheless, we prove the existence of equilibrium in multi-protocol networks in\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Ao Tang, Jintao Wang, S. H. Low and M. Chiang.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/abstract/document/4265609/\"],[11,\"target\",\"_blank\"],[9],[0,\"Equilibrium of heterogeneous congestion control: existence and uniqueness\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE/ACM Transactions on Networking\"],[10],[0,\",\\n    15(4):824-837, Oct 2007\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  For almost all networks, the equilibria are locally unique, and finite and odd in number. They cannot all be locally stable unless there is a globally unique equilibrium. We show that if the price mapping functions, which map link prices to effective prices observed by the sources, are sufficiently similar, then global uniqueness is guaranteed.\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/research/communication-networks.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/research/electric-vehicles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "TojN4WeU",
    "block": "{\"symbols\":[],\"statements\":[[7,\"h1\"],[11,\"class\",\"display-4 mt-3\"],[9],[0,\"Research\"],[10],[0,\"\\n\"],[7,\"h2\"],[11,\"class\",\"mt-3\"],[9],[0,\"Electric Vehicles\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[0,\"Vehicles consumed more than a quarter of energy and emitted more than a quarter of energy-related carbon dioxide in the US in 2014. Electrification of our transportation system will be an important component of future power systems because an electric vehicle (EV) is a huge load: an EV can add 50% energy consumption (4,000 kWh annually) to an average CA household and demand 2 to 20 times more power (3 – 20 kW) than an average CA household. It is however also an extremely flexible load hence invaluable for integrating renewable sources, such as wind and solar power, into our electric grid. We have worked on optimal scheduling of EV charging, and algorithms for EV battery swapping. We have also built an state-of-the-art EV charging system and transferred the technology through a startup.\"],[10],[0,\"\\n\\n\"],[7,\"ol\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#algorithm-design\"],[9],[0,\"Algorithm Design\"],[10],[10],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#entrepreneurship\"],[9],[0,\"Entrepreneurship\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"figure\"],[11,\"class\",\"col-lg-10 col-md-8 mx-auto\"],[9],[0,\"\\n  \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/timeline.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n    \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/timeline.png\"],[11,\"alt\",\"ACN timeline\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"algorithm-design\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Algorithm Design\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"Optimal EV charging.\"],[10],[0,\"\\n  We design a distributed iterative scheduling algorithm for EV charging in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"L. Gan, U. Topcu and S. H. Low. \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Gan-2012-EV.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Optimal decentralized protocol for electric vehicle charging\"],[10],[0,\", \"],[7,\"em\"],[9],[0,\"IEEE Trans. on\\nPower Systems\"],[10],[0,\", 228(2):940–951, May 2013\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"where, in each iteration, EVs update their charging profiles according to the control signal broadcast by an aggregator, and the aggregator adjusts the control signal to guide their updates. The algorithm converges to optimal charging profiles even when EVs can plug in at different times, update their charging profiles at different times with different frequencies, and may use outdated control signals when they update.\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-8 col-12 mx-auto\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/ev-cumulative-station-current.jpg\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/ev-cumulative-station-current.jpg\"],[11,\"alt\",\"EV charging - Cummulative Station Current (Jan 2018)\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"\\n        Cumulative charging current (Jan 2018): each color represents the charging curve for an EV.\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"entrepreneurship\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Entrepreneurship\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  California has committed to have 1.5 million zero- emission vehicles on the road by 2025. The Chinese city Shenzhen plans to have 100% of its taxi’s be electric by 2020. The growth of EV depends on, and will drive, the growth of charging infrastructure. Working with Netlab alumni and Caltech Facilities, we have built an Adaptive Charging Network (ACN), consisting of 63 level-2 chargers and 1 DC fast charger, served by two 150 kVA transformers, local controllers as well as communication equipment. ACN is capable of real-time measurement, communication, computing and control, and adapts EV charging rates to the driver needs as well as capacity limits of the electric system. It has been charging EVs since February 2016 and has delivered over 475 MWh, equivalent to 1.5 million miles and 500 metric tons of avoided greenhouse gases by July 2018 (\"],[7,\"a\"],[11,\"href\",\"https://caltech.powerflexsystems.com\"],[11,\"target\",\"_blank\"],[9],[0,\"https://caltech.powerflexsystems.com\"],[10],[0,\"). The Caltech ACN testbed is described in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"figure\"],[11,\"class\",\"col-lg-6 float-md-right\"],[9],[0,\"\\n  \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/Caltech-ACN-testbed-system-typology.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n    \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/Caltech-ACN-testbed-system-typology.png\"],[11,\"alt\",\"ESnet backbone bandwidth graph (Mbps)\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"\\n    Caltech ACN\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    G. Lee, T. Lee, Z. Low, S. H. Low and C. Ortega.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/7905971/\"],[11,\"target\",\"_blank\"],[9],[0,\"Adaptive charging network for electric vehicles\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proc. of the IEEE Global Conference on Signal and Information Processing (GlobalSIP)\"],[10],[0,\",\\n    Washington, DC, December 2016\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Z. Lee, D. Chang, C. Jin, G. S. Lee, R. Lee, T. Lee and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Lee-2018-Practical-Considerations-LSHD-EV-charging.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Large-Scale Adaptive Electric Vehicle Charging\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proc. of the IEEE International Conference on Communications, Control, and Computing Technologies for Smart Grids (SmartGridComm)\"],[10],[0,\",\\n    Aalborg, Denmark, October 2018\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    LACI, December 2018: \"],[7,\"a\"],[11,\"href\",\"/assets/slides/Low-201812-ACN.pptx\"],[11,\"target\",\"_blank\"],[9],[0,\"Slides\"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"ACN has been used for 16 projects between 2016 and 2018 for 22 undergraduates, including 4 female students: 4 SURF projects (4 students) in summer 2016, 1 class project (4 students) and 1 Directed Study (1 student) in Fall 2016, 1 class project (2 students) and 2 Directed Studies (5 students) in Winter 2017, 5 class projects (5 students) and 1 Directed Studies (1 student) in Winter 2018, and 1 SURF project (1 student) in Summer 2018.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"In its simplest form, optimal charging can be formulated as a linear program (LP) or a quadratic program (QP). An offline LP assumes all future EV arrivals, departures, and energy demands are known and computes the charging profiles of all EVs as an optimal solution of a single LP. An online LP is an iterative algorithm in a model-predictive control fashion, and, in each iteration, computes the charging profiles of existing EVs assuming there will not be any future EV arrival. Offline LP is impractical but serves as a lower bound on the cost of online LP which can be implemented in ACN. Extensive simulations using datasets from Caltech ACN and Google’s charging facilities show that the performance of online LP is extremely close to that of offline LP. It is proved in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    L. Guo, K. F. Erliksson and S. H. Low. \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Guo-2017-OLP.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Optimal online adaptive electric vehicle charging\"],[10],[0,\".\\n    \"],[7,\"em\"],[9],[0,\"Proc. of the IEEE Power and Energy Society General Meeting\"],[10],[0,\",\\n    Chicago, IL, July 2017\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"that, under appropriate assumptions, when online LP is feasible it indeed attains offline optimal.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"A popular class of scheduling algorithms is the least-laxity first (LLF) algorithm that prioritizes EVs that have\\nlower laxity. Laxity can be defined in various ways and all capture the slack in providing the requested energy\\nover available time subject to maximum charging rate. We propose an LLF algorithm that turns out to match the\\nperformance of online LP in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Y. Nakahira, N. Chen, L. Chen and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Nakahira-2017-llf.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Smoothed Least-laxity-first Algorithm for EV Charging\"],[10],[0,\".\\n    \"],[7,\"em\"],[9],[0,\"Proc. the Eighth International Conference on Future Energy Systems\"],[10],[0,\",\\n    2017\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"This is surprising because online LP matches well offline optimal by solving for entire charging profiles, taking into account of charging rates at future times, while LLF algorithms are myopic. It turns out that, under our laxity definition, the algorithm (of valley-filling type) equivalently solves a convex optimization problem that implicitly takes into account of charging behavior in the next iteration.\"],[10],[0,\"\\n\\n\"],[7,\"figure\"],[11,\"role\",\"group\"],[11,\"class\",\"row align-items-lg-start\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-6 col-12\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/ev-charging-real-time-tracking-of-PV-generation.jpg\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/ev-charging-real-time-tracking-of-PV-generation-sm.jpg\"],[11,\"alt\",\"EV charging - real-time tracking of PV generation\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"JPL demo (Oct 2016): Real-time tracking of PV generation\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-6 col-12\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/nrel-demand-charging-mitigation.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/nrel-demand-charging-mitigation-sm.png\"],[11,\"alt\",\"NREL: demand charge mitigation\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"NREL (Nov 2018): demand charge mitigation\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"We are pursuing tech transfer through a startup \"],[7,\"a\"],[11,\"href\",\"http://powerflexsystems.com/\"],[11,\"target\",\"_blank\"],[9],[0,\"PowerFlex Systems\"],[10],[0,\" that can provide a target charging capacity at 30%-60% lower capital and operating costs. It may also provide energy services to utility companies or ISO markets in the future. \"],[7,\"a\"],[11,\"href\",\"http://caltech.powerflexsystems.com/dashboard/db/california-garage\"],[11,\"target\",\"_blank\"],[9],[0,\"View live data from Caltech's California Garage.\"],[10],[10],[0,\"\\n\\n\"],[7,\"h5\"],[9],[0,\"\\n  \"],[7,\"a\"],[11,\"href\",\"http://caltech.powerflexsystems.com/dashboard/db/california-garage\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n    PowerFlex Deployments\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\nUntil \"],[1,[23,[\"mileage\",\"time\"]],false],[0,\":\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[1,[23,[\"mileage\",\"value\"]],false],[0,\"M miles delivered\"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[1,[23,[\"CO2\",\"value\"]],false],[0,\" metric tons of CO\"],[7,\"sub\"],[9],[0,\"2\"],[10],[0,\" equivalent avoided\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"id\",\"deployment-gallery\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-lg-2 col-md-2 col-sm-4 col-6 mb-3\"],[9],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/powerflex/powerflex-transformer-and-subpanels.jpg\"],[11,\"data-sub-html\",\".caption\"],[9],[0,\"\\n      \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/powerflex/powerflex-transformer-and-subpanels-300x200.jpg\"],[11,\"alt\",\"\"],[11,\"class\",\"img-thumbnail img-fluid\"],[9],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"caption\"],[9],[0,\"\\n        Transformer and subpanels\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"col-lg-2 col-md-2 col-sm-4 col-6 mb-3\"],[9],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/powerflex/powerflex-main-panel.jpg\"],[11,\"data-sub-html\",\".caption\"],[9],[0,\"\\n      \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/powerflex/powerflex-main-panel-300x200.jpg\"],[11,\"alt\",\"\"],[11,\"class\",\"img-thumbnail img-fluid\"],[9],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"caption\"],[9],[0,\"\\n        Main panel\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"col-lg-2 col-md-2 col-sm-4 col-6 mb-3\"],[9],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/powerflex/powerflex-hardware.jpg\"],[11,\"data-sub-html\",\".caption\"],[9],[0,\"\\n      \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/powerflex/powerflex-hardware-300x200.jpg\"],[11,\"alt\",\"\"],[11,\"class\",\"img-thumbnail img-fluid\"],[9],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"caption\"],[9],[0,\"\\n        Charger\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"col-lg-2 col-md-2 col-sm-4 col-6 mb-3\"],[9],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/powerflex/powerflex-hardware-2.jpg\"],[11,\"data-sub-html\",\".caption\"],[9],[0,\"\\n      \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/powerflex/powerflex-hardware-2-300x200.jpg\"],[11,\"alt\",\"\"],[11,\"class\",\"img-thumbnail img-fluid\"],[9],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"caption\"],[9],[0,\"\\n        Communication Module\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"col-lg-2 col-md-2 col-sm-4 col-6 mb-3\"],[9],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/powerflex/powerflex-phone-app.jpg\"],[11,\"data-sub-html\",\".caption\"],[9],[0,\"\\n      \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/powerflex/powerflex-phone-app-300x200.jpg\"],[11,\"alt\",\"\"],[11,\"class\",\"img-thumbnail img-fluid\"],[9],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"caption\"],[9],[0,\"\\n        Phone app\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"col-lg-2 col-md-2 col-sm-4 col-6 mb-3\"],[9],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/powerflex/powerflex-california-garage-debugging.jpg\"],[11,\"data-sub-html\",\".caption\"],[9],[0,\"\\n      \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/powerflex/powerflex-california-garage-debugging-300x200.jpg\"],[11,\"alt\",\"\"],[11,\"class\",\"img-thumbnail img-fluid\"],[9],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"caption\"],[9],[0,\"\\n        Debugging\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"col-12\"],[9],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/ev/powerflex/CaltechACN.png\"],[11,\"data-sub-html\",\".caption\"],[9],[0,\"\\n      \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/ev/powerflex/CaltechACN.png\"],[11,\"alt\",\"\"],[11,\"class\",\"img-thumbnail img-fluid\"],[9],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"caption text-center\"],[9],[0,\"\\n        Caltech ACN\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/research/electric-vehicles.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/research/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "6JZkqxWe",
    "block": "{\"symbols\":[],\"statements\":[[7,\"h1\"],[11,\"class\",\"display-4 mt-3\"],[9],[0,\"Research\"],[10],[0,\"\\n\"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[0,\"Electricity generation and transportation consume about two-third of energy in the US and emit more than half of greenhouse gases.\"],[10],[0,\"\\n\"],[7,\"p\"],[9],[0,\"To drastically reduce greenhouse gases, we must generate more electricity from clean sources and electrify transportation. To this end, the power network, from generation to transmission and distribution to consumption, will undergo an architectural transformation in the following decades that the communication network has gone through in the last two. The traditional network has a small number of large generators that are actively controlled to meet the demand of a much larger number of passive loads. The control paradigm is to schedule supply to meet forecast demand. The future smart grid will have a large number of small distributed generation resources that are not dispatchable nor accurately predictable, as well as a large number active loads. Unlike most endpoints today that are merely passive loads, the future network of distributed energy resources (DERs) may generate, sense, compute, communicate, and actuate. These intelligent DERs will create a severe risk by introducing rapid, large, and random fluctuations in power supply and demand, voltage and frequency, as well as a tremendous opportunity for a clean energy future by drastically increasing our capability to coordinate and optimize their operation in real time.\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-12 mx-auto d-flex justify-content-center\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"img\"],[11,\"id\",\"evolution\"],[11,\"src\",\"/assets/images/research-areas/evolution.png\"],[11,\"alt\",\"Power network evolution\"],[9],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"Figure 1: Power network evolution\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Netlab's research focuses on some of the most fundamental challenges in this historic transformation.\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-6\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"research bg-gray mb-3 py-3 clickable\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"research.power-systems-steady-state\"],null,{\"statements\":[[0,\"        \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col-md-7 order-md-1 my-auto\"],[9],[0,\"\\n              \"],[7,\"h5\"],[9],[0,\"Power Systems: Steady State\"],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col-md-5 order-md-1\"],[9],[0,\"\\n              \"],[7,\"div\"],[11,\"class\",\"research-image bg-psss bg-cover w-100 h-100\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-6\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"research bg-gray mb-3 py-3 clickable\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"research.power-systems-dynamics\"],null,{\"statements\":[[0,\"        \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col-md-7 order-md-2 my-auto\"],[9],[0,\"\\n              \"],[7,\"h5\"],[9],[0,\"Power Systems: Dynamics\"],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col-md-5 order-md-1\"],[9],[0,\"\\n              \"],[7,\"div\"],[11,\"class\",\"research-image bg-power-systems-dynamics bg-cover w-100 h-100\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-6\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"research bg-gray mb-3 py-3 clickable\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"research.electric-vehicles\"],null,{\"statements\":[[0,\"        \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col-md-7 order-md-1 my-auto\"],[9],[0,\"\\n              \"],[7,\"h5\"],[9],[0,\"Electric Vehicles (EV)\"],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col-md-5 order-md-1 clickable\"],[9],[0,\"\\n              \"],[7,\"div\"],[11,\"class\",\"research-image bg-electric-vehicles bg-cover w-100 h-100\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-6\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"research bg-gray mb-3 py-3 clickable\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"research.communication-networks\"],null,{\"statements\":[[0,\"        \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col-md-7 order-md-2 my-auto\"],[9],[0,\"\\n              \"],[7,\"h5\"],[9],[0,\"Communication Networks\"],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col-md-5 order-md-1\"],[9],[0,\"\\n              \"],[7,\"div\"],[11,\"class\",\"research-image bg-communication-networks bg-cover w-100 h-100\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/research/index.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/research/power-systems-dynamics", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "FQNSTLNO",
    "block": "{\"symbols\":[],\"statements\":[[7,\"h1\"],[11,\"class\",\"display-4 mt-3\"],[9],[0,\"Research\"],[10],[0,\"\\n\"],[7,\"h2\"],[11,\"class\",\"mt-3\"],[9],[0,\"Power Systems: Dynamics\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[0,\"The dynamics of a transmission network is mainly driven by that of the bulk generators. This can be modeled by a system of nonlinear differential algebraic equations. We often study linearized power flows for simplicity.\"],[10],[0,\"\\n\\n\"],[7,\"ol\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#frequency-regulation\"],[9],[0,\"Frequency Regulation\"],[10],[10],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#impact-of-topology\"],[9],[0,\"Impact of Network Topology\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"frequency-regulation\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Frequency Regulation\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Frequency control maintains the frequency of a power system tightly around its nominal value when demand or supply fluctuates. It is traditionally implemented on the generation side and consists of three mechanisms that work at different timescales in concert. The primary control restores power balance in about 30 seconds and is completely decentralized. The secondary control, called automatic generation control, operates at a timescale of several minutes and coordinates the setpoints of governors in a control area in a centralized fashion to drive the frequency back to its nominal value and the inter-area power flows to their scheduled values. The tertiary control, called economic dispatch, operates at a timescale of several minutes to an hour and schedules the output levels of generators that are online and the inter-area power flows, usually by solving centrally \"],[7,\"em\"],[9],[0,\"(N — 1)\"],[10],[0,\" security-constrained OPF.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Ubiquitous continuous fast-acting distributed load-side participation in frequency control can greatly improve the\\ndynamic and steady-state behavior. The idea of load-side participation dates back to Schweppe and his co-workers in\\nthe late 1970s. In:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    C. Zhao, U. Topcu, L. Li and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://authors.library.caltech.edu/45963/7/1305.0585v3.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Design and stability of load-side primary frequency control in power systems\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Automatic Control\"],[10],[0,\",\\n    59(5):1177–1189, 2014\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n    \"],[7,\"strong\"],[9],[0,\"Additional slides:\"],[10],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/slides/Low-201506-OLC3-Skoltech.pptx\"],[11,\"target\",\"_blank\"],[9],[0,\"Slides\"],[10],[0,\" (Skoltech Conf on Advanced Mathematical Methods For Energy Systems, June 2015)\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"we develop a new approach to the design of load-side primary frequency control. The key idea is to formalize the control goal as a constrained optimization problem (called OLC, optimal load control) and design completely decentralized controllers such that the dynamics of the closed-loop system carries out a primal-dual algorithm to solve OLC. We prove that the equilibrium of the closed-loop dynamics is an optimal solution of OLC and is globally asymptotically stable. In:\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-6 col-12 mx-auto\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/power-systems-dynamics/ieee-68-bus-test-system.gif\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/power-systems-dynamics/ieee-68-bus-test-system.gif\"],[11,\"alt\",\"Single line diagram of the IEEE 68-bus test system.\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"Single line diagram of the IEEE 68-bus test system.\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    E. Mallada, C. Zhao and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Mallada-2015-OLC-arXiv.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Optimal load-side control for frequency regulation in smart grids\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Automatic Control\"],[10],[0,\",\\n    62(12):6294–6309, December 2017\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"we greatly extend this approach to include secondary frequency control that restores the frequency back to its nominal value, drives the inter-area power flows to their scheduled values, and enforces line limits in equilibrium. Unlike the traditional AGC, our control is distributed, requiring only neighborhood communication, and manages line congestion at fast timescale. This can provide reactive security at the secondary control timescale and relax the preventive approach of \"],[7,\"em\"],[9],[0,\"N — 1\"],[10],[0,\" security at the tertiary control timescale, yielding economic efficiency. These two papers use linearized power flows and ignore generator dynamics. In:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    C. Zhao, E. Mallada, S. H. Low and J. Bialek.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Zhao-2018-Distributed.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Distributed plug-and-play optimal generator and load control for power system frequency regulation\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"International Journal of Electrical Power & Energy Systems\"],[10],[0,\",\\n    101:1–12, October 2018\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"we generalize our approach to nonlinear power flows and generic turbine-governor models, and propose distributed algorithms for both loads and generators.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Another design and stability proof using linear power flows are developed in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Z. Wang, F. Liu, S. H. Low, C. Zhao and S. Mei.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Wang-2018-OLC-part-1-arXiv.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Distributed frequency control with operational constraints, part I: per-node power balance\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Smart Grid\"],[10],[0,\",\\n    2017\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Z. Wang, F. Liu, S. H. Low, C. Zhao and S. Mei.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Wang-2018-OLC-part-2-arXiv.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Distributed frequency control with operational constraints, part II: network power balance\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Smart Grid\"],[10],[0,\", 2017\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"impact-of-topology\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Impact of Network Topology\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\nAdd later.\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/research/power-systems-dynamics.hbs"
    }
  });

  _exports.default = _default;
});
;define("netlab/templates/research/power-systems-steady-state", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "easPatQB",
    "block": "{\"symbols\":[],\"statements\":[[7,\"h1\"],[11,\"class\",\"display-4 mt-3\"],[9],[0,\"Research\"],[10],[0,\"\\n\"],[7,\"h2\"],[11,\"class\",\"mt-3\"],[9],[0,\"Power Systems: Steady State\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[11,\"class\",\"lead\"],[9],[0,\"The behavior of power systems at timescales of minutes and up is described by a set of nonlinear power flow equations modeling the Kirchhoff’s laws.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Numerous power system operations and planning applications have at their core an optimization problem called an \"],[7,\"em\"],[9],[0,\"optimal power flow\"],[10],[0,\" (OPF) problem, first formulated by Carpentier in 1962. The simplest version takes the form of minimizing a convex cost function, such as generation cost, power loss, or user disutility, subject to the set of nonlinear power flow equations and capacity, stability and security constraints. We have studied four issues on OPF: nonconvexity, scalability, real-time optimization, and applications.\"],[10],[0,\"\\n\\n\"],[7,\"ol\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#semidefinite-relaxation\"],[9],[0,\"Semidefinite relaxation of OPF\"],[10],[10],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#distributed\"],[9],[0,\"Distributed OPF\"],[10],[10],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#real-time\"],[9],[0,\"Real-time OPF\"],[10],[10],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#applications\"],[9],[0,\"Applications\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"semidefinite-relaxation\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Semidefinite relaxation of OPF\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Due to the nonlinearity of the power flow equations, OPF has a nonconvex feasible set and is NP-hard. We have developed a theory of convex relaxations of OPF that lifts the OPF feasible set to the cone of positive semidefinite matrices or the second-order cone. A relaxation is exact when an optimal solution of the original nonconvex OPF can be recovered from an optimal solution of the relaxation. We have clarified the relationship between two OPF models (the bus injection model and the branch flow model) and their relaxations, and proved sufficient conditions for exact relaxation. A good summary of the literature is the two-part tutorial:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Low-201404-OPFTutorial1-arXiv.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Convex relaxation of optimal power flow, I: formulations and equivalence\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Control of Network Systems\"],[10],[0,\",\\n    1(1): 15–27, March 2014\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Low-201406-OPFTutorial-2.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Convex relaxation of optimal power flow, II: exactness\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Control of Network Systems\"],[10],[0,\",\\n    1(2): 177–189, June 2014\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    \"],[7,\"strong\"],[9],[0,\"Additional slides:\"],[10],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/slides/Low-201501-OPFTutorial-2hr.pptx\"],[11,\"target\",\"_blank\"],[9],[0,\"Slides\"],[10],[0,\"\\n    (CNLS Grid Science Winter School, Santa Fe, NM, Jan 2015)\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Our own contributions are highlighted below.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"Bus injection model.\"],[10],[0,\"\\n  The question of whether the semidefinite relaxation of OPF in the bus injection model is exact is first studied in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    J. Lavaei and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Lavaei-2012-OPF-TPS.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Zero duality gap in optimal power flow problem\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Power Systems\"],[10],[0,\",\\n    27(1):92-107, February 2012\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"A sufficient condition that guarantees the exactness of second-order cone relaxation of OPF on radial networks (with tree topology) in the bus injection model is proved in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. Bose, D. Gayme, K. M. Chandy and S. H. Low. \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Bose-2012-QCQP-arXiv.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Quadratically constrained quadratic programs on acyclic graphs with application to power flow\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Control of Network Systems\"],[10],[0,\",\\n    2(3): 278–287, September 2015\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"Branch flow model (BFM).\"],[10],[0,\"\\n  Baran and Wu proposed in 1989 the DistFlow model for radial networks and its linearization. It turns out that DistFlow model is much more stable numerically than the bus injection model, and its linearization has simple analytical solutions that can be proved to bound the power flow solution of the nonlinear DistFlow model (see Low (2014) tutorial part-I above).\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"We have proposed second-order cone (SOC) relaxation of OPF defined on the DistFlow model and proved sufficient conditions for its exactness on radial networks in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    M. Farivar and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/FarivarLow-201304-BFM2parts-TPS.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Branch flow model: relaxations and convexification (Parts I, II)\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Power Systems\"],[10],[0,\",\\n    28(3):2554–2564, August 2013\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n    \"],[7,\"strong\"],[9],[0,\"Additional resources:\"],[10],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/slides/Low-201205-BFM.pptx\"],[11,\"target\",\"_blank\"],[9],[0,\"Slides\"],[10],[0,\" |\\n    \"],[7,\"a\"],[11,\"href\",\"http://youtu.be/WMDeIAXHAAw\"],[11,\"target\",\"_blank\"],[9],[0,\"Video\"],[10],[0,\" (Berkeley i4Energy Seminar, April 2012)\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    L. Gan, N. Li, U. Topcu and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Gan-2014-BFMt-TAC.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Exact convex relaxation of optimal power flow in radial networks\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. Automatic Control\"],[10],[0,\",\\n    60(1):72–87, January 2015\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"This SOC relaxation is used to develop distributed solution of OPF for radial networks; see below.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Farivar and Low (2013) above also generalizes the DistFlow model to a branch flow model (BFM) that is applicable to general mesh network. BFM reduces to the DistFlow model when the network is radial. For mesh network, the DistFlow model is a relaxation obtained from BFM by ignoring a nonconvex cycle condition. Both the DistFlow model and BFM are single-phased. Most distribution systems are however multiphase unbalanced. BFM and its SOC relaxation are generalized to multiphase unbalanced networks and SDP relaxation in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    L. Gan and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Gan-2014-MultiPhase-PSCC.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Convex relaxations and linear approximation for optimal power flow in multiphase radial networks\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proc. of the 18th Power Systems Computation Conference (PSCC)\"],[10],[0,\",\\n    Wroclaw, Poland, August 2014\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"Equivalence.\"],[10],[0,\"\\n  We have developed various characterizations of the OPF feasible set and designed different relaxations based on these characterizations. Their relationship is studied in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    S. Bose, S. H. Low, T. Teeraratkul and B. Hassibi.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Bose-2014-equivalence-arXiv.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Equivalent relaxations of optimal power flow\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Automatic Control\"],[10],[0,\",\\n    60(3):729–742, March 2015\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"There are three important implications. First BFM is equivalent to the bus injection model in the sense that there is a bijection mapping between the solution sets of these two models. Second any sufficient condition that guarantees exact semidefinite relaxation of OPF in one model will imply the exactness of the same relaxation in the other model. Finally SOC relaxation, though much simpler computationally, is equivalent to SDP relaxation in terms of exactness, and therefore one should always solve SOC relaxation and not SDP relaxation for radial networks.\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"distributed\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Distributed OPF\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"SDP relaxation of OPF, though convex, is still computational intensive for large networks. To scale the computation, we propose distributed algorithms to solve OPF for radial networks, both single and multiphase, using three simple ideas. First we use BFM (DistFlow model for single-phase networks and the multiphase generalization in Gan and Low (2014) for multiphase networks) because it has superior numerical stability and solve the semidefinite relaxations of OPF in BFM. Second we decompose the computation to each individual bus (or group of buses) by introducing decoupling variables and consensus constraints. Third we apply ADMM (alternating direction method of multipliers) to obtain a distributed solution. Each iteration of a standard ADMM algorithm requires solving optimization subproblems, typically iteratively. For our problem, every subproblem can be solved in closed form or reduced to a 6 × 6 eigenvalue problem regardless of the size of the network. This greatly speeds up the ADMM computation. This is explained in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Q. Peng and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://authors.library.caltech.edu/68953/3/07440858.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Distributed optimal power flow algorithm for radial networks, I: balanced single phase case\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Smart Grid\"],[10],[0,\",\\n    9(1):111–121, January 2018\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Q. Peng and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Peng-2015-Unbalanced-arXiv.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Distributed algorithm for optimal power flow on an unbalanced radial network\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proc. of IEEE Conference on Decision and Control (CDC)\"],[10],[0,\",\\n    Osaka, Japan, December 2015\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"real-time\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Real-time OPF\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Even though the algorithms above are distributed, they iterate on all variables in the cyberspace until they converge before their solutions are applied to the physical grid. In particular, the intermediate iterates typically do not satisfy the power flow equations nor operational constraints. While offline algorithms are suitable for traditional applications such as economic dispatch or state estimation, they may become inadequate for realtime optimization of DERs in the future, especially in the presence of fluctuating loads and volatile renewables.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"We have developed real-time OPF algorithms that iterate only on variables corresponding to controllable devices (e.g., intelligent loads) in feedback interaction with the grid, modeled by power flow equations, as illustrated in Figure 1. The control objective is specified by an optimization problem and our goal is to design a real-time feedback controller so that the closed-loop system converges to an equilibrium that solves the optimization problem. The basic idea is to explicitly exploit power network as a power flow solver, update our control variables by taking a single first-order or second-order gradient direction and apply it to the network in each iteration, without waiting for the computation to converge. The network will solve the power flow equations in response of the control input and produce a new network state, which is then used to compute the next gradient iteration for the control variables, and the cycle repeats, as illustrated in Figure 2. An important advantage of this is that such algorithms naturally tracks the solution of timevarying OPF problems, when changes manifest themselves in the network state that is used to calculate the control. First-order real-time OPF algorithms are explained in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    L. Gan and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/7397846/\"],[11,\"target\",\"_blank\"],[9],[0,\"An online gradient algorithm for optimal power flow on radial networks\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Journal on Selected Areas in Communications\"],[10],[0,\",\\n    Special issue on Emerging technologies in communications, 34(3):625–638, March 2016\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n    \"],[7,\"strong\"],[9],[0,\"Additional slides:\"],[10],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/slides/Low-201603-OnlineAlg-CISS.pptx\"],[11,\"target\",\"_blank\"],[9],[0,\"Slides\"],[10],[0,\"\\n    (CISS Plenary, Princeton, March 2016)\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-6 col-sm-12\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/power-systems-steady-state/power-systems-steady-state-realtimeOPF1.svg\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/power-systems-steady-state/power-systems-steady-state-realtimeOPF1.svg\"],[11,\"alt\",\"General structure of real-time, or online, algorithms for optimization problems.\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"Figure 1: General structure of real-time (online) feedback-based algorithms.\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-6 col-sm-12\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/power-systems-steady-state/power-systems-steady-state-realtimeOPF2.svg\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/power-systems-steady-state/power-systems-steady-state-realtimeOPF2.svg\"],[11,\"alt\",\"General structure of real-time, or online, algorithms for optimization problems.\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"Figure 2: Real-time OPF: controller applies control \"],[7,\"em\"],[9],[0,\"u(t)\"],[10],[0,\" to the grid, which implicitly solves power flow equations \"],[7,\"em\"],[9],[0,\"F(x,u(t)) = 0\"],[10],[0,\" to determine state \"],[7,\"em\"],[9],[0,\"x(t)\"],[10],[0,\", which is measured and used to compute the control \"],[7,\"em\"],[9],[0,\"u(t +1)\"],[10],[0,\".\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"and second-order algorithms in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Y. Tang, K. Dvijotham, and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/7929408/\"],[11,\"target\",\"_blank\"],[9],[0,\"Real-time optimal power flow\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Smart Grid\"],[10],[0,\",\\n    special issue on Distributed control and efficient optimization methods for smart grid, 8(6):2963–2973, November 2017\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Y. Tang, E. Dall’Anese, A. Bernstein, and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/cdc2018_tang.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"A Feedback-Based Regularized Primal-Dual Gradient Method\\nfor Time-Varying Nonconvex Optimization\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proc. IEEE Conference on Decision and Control (CDC)\"],[10],[0,\",\\n    Florida, US, December 2018\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"h3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"id\",\"applications\"],[11,\"class\",\"offset-anchor\"],[9],[10],[0,\"\\n  Applications\\n  \"],[7,\"small\"],[9],[7,\"a\"],[11,\"href\",\"#top\"],[11,\"class\",\"float-right\"],[9],[0,\"↑ top\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"Storage sizing and placement.\"],[10],[0,\"\\n  We have studied the problem of optimal placement and capacity of energy storage devices in a distribution network to minimize total energy loss, focusing on the structural properties of optimal strategies. A continuous tree with linearized Dist-Flow model is developed to model the distribution network. When all loads have the same shape, we prove that it is optimal to place storage devices near the leaves of the network away from the substation, and that the scaled storage capacity monotonically increases towards the leaves. Moreover, under optimal storage placement, the locational marginal value of storage is equalized wherever nonzero storage is deployed and increases from the substation towards any leaf node over places where there is zero storage deployment. We illustrate through simulations that these structural properties are robust in that they hold approximately when some of our modeling assumptions are relaxed. This is explained in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Y. Tang and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/7938710/\"],[11,\"target\",\"_blank\"],[9],[0,\"Optimal placement of energy storage in distribution networks\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. on Smart Grid\"],[10],[0,\",\\n    special issue on Distributed control and efficient optimization methods for smart grid, 8(6):3094–3103, November 2017\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-md-8 col-12 mx-auto\"],[9],[0,\"\\n    \"],[7,\"figure\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/power-systems-steady-state/injection.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/power-systems-steady-state/injection.png\"],[11,\"alt\",\"An example of a typical injection curve\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"/assets/images/research-areas/power-systems-steady-state/charging.png\"],[11,\"target\",\"_blank\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"src\",\"/assets/images/research-areas/power-systems-steady-state/charging.png\"],[11,\"alt\",\"An example of a typical charging curve\"],[11,\"class\",\"img-fluid\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"figcaption\"],[11,\"class\",\"text-center\"],[9],[0,\"An example of a typical charging and discharging curve \"],[7,\"em\"],[9],[0,\"∂b\"],[7,\"sup\"],[9],[0,\"∗\"],[10],[0,\"(x,t)/∂t\"],[10],[0,\".\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"Volt/var control.\"],[10],[0,\"\\n  Traditional voltage control in a distribution network is achieved by reconfiguring shunt capacitors or voltage regulators, at a slow timescale, mainly to adapt to the gradual changes of the aggregate load on a feeder. As wind and solar generations proliferate, voltage fluctuations will become rapid, large and random, necessitating faster controllers. Inverters can provide real-time voltage control by adapting its output reactive power in response to network state. This is formulated as an OPF problem, using DistFlow model, and solved through SOC relaxation in:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    M. Farivar, C. R. Clarke, S. H. Low and K. M. Chandy.\\n    \"],[7,\"a\"],[11,\"href\",\"https://authors.library.caltech.edu/80116/1/06102366.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Inverter VAR control for distribution systems with renewables\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proc. IEEE SmartGridComm Conference\"],[10],[0,\",\\n    Brussels, Belgium, October 2011\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"This paper is the first to propose SOC relaxation of OPF for radial networks using the DistFlow model and proves its exactness.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"The solution above through OPF is centralized where optimal inverter decisions over the distribution system are coordinated using global information. A decentralized approach where each inverter adapts in real time its own reactive power output based only on its local bus voltage is developed in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    M. Farivar, L. Chen and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/6760555/\"],[11,\"target\",\"_blank\"],[9],[0,\"Equilibrium and dynamics of local voltage control in distribution systems\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proc. IEEE Conference on Decision and Control (CDC)\"],[10],[0,\",\\n    Florence, Italy, December 2013\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"The system consisting of the network modeled by a linearization of the DistFlow model and the inverter control forms a closed-loop dynamical system. We prove that this dynamical system has a unique equilibrium point, the equilibrium is an optimal solution of a certain convex optimization problem, and the cost function of the optimization problem is a Lyapunov function of the dynamics, certifying the global asymptotic stability of the equilibrium.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"PV adoption and infrastructure investment.\"],[10],[0,\"\\n  As the cost of photovoltaic (PV) generation continues to drop, more households will have an economic incentive to adopt rooftop PV systems and reduce their purchases of electricity from the grid. A significant portion of the costs incurred by utility companies are fixed costs, and therefore electricity rates must increase in order for utility companies to recover these fixed costs from shrinking sales bases, potentially driving more households to adopt PV systems. In:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    D.W.H. Cai, S. Adlakha, S. H. Low, P. De Martini and K. M. Chandy.\\n    \"],[7,\"a\"],[11,\"href\",\"https://www.sciencedirect.com/science/article/pii/S0301421513006526\"],[11,\"target\",\"_blank\"],[9],[0,\"Impact of residential PV adoption on retail electricity rates\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Energy Policy\"],[10],[0,\",\\n    62(C):830–843, 2013\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"we model this feedback between PV adoption and electricity rates and study its impact on future PV penetration and net-metering costs using real data from the Southern California Edison. This motivates an infrastructure investment problem faced by a social planner who seeks to minimize the long-term discounted costs (associated with both the procurement and the usage of conventional and distributed generation resources), subject to meeting an inelastic demand for electricity. We fully characterize the optimal investment policy for the social planner in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    D.W.H. Cai, Y. Xu and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/abstract/document/6736506/\"],[11,\"target\",\"_blank\"],[9],[0,\"Optimal investment of conventional and renewable generation assets\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proc. 51st Annual Allerton Conference on Communication, Control, and Computing\"],[10],[0,\",\\n    Monticello, IL, October 2013\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"\\n  \"],[7,\"strong\"],[9],[0,\"Demand response.\"],[10],[0,\"\\n  Demand-side management will be a key component of future smart grid that can help reduce peak load and adapt elastic demand to fluctuating supply. We propose in the following a scheduling approach based on utility maximization where an appliance provides a certain benefit depending on the pattern or volume of power it consumes and the goal is to schedule consumptions to maximize social welfare subject to various consumption and power constraints:\\n\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    N. Li, L. Chen and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/6039082/\"],[11,\"target\",\"_blank\"],[9],[0,\"Optimal demand response based on utility maximization in power networks\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proceedings of the 2011 IEEE Power & Energy Society General Meeting\"],[10],[0,\",\\n    Detroit, MI, July 2011\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    L. Chen, N. Li, L. Jiang and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://link.springer.com/chapter/10.1007%2F978-1-4614-1605-0_3\"],[11,\"target\",\"_blank\"],[9],[0,\"Optimal demand response: problem formulation and deterministic case\"],[10],[0,\",\\n    In \"],[7,\"em\"],[9],[0,\"Control and Optimization Theory for Electric Smart Grids\"],[10],[0,\",\\n    Aranya Chakrabortty and Marija Ilic, Editors, Springer 2012\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Time-varying prices can be used to align individual optimality with social optimality.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Model predictive control is an effective approach for deferrable load control. Though the average-case performance of such control has been studied in the literature, the distribution of the performance has been elusive. In:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    N. Chen, L. Gan, S. H. Low and A. Wierman.\\n    \"],[7,\"a\"],[11,\"href\",\"/assets/publications/Chen-2014-MPC-arXiv.pdf\"],[11,\"target\",\"_blank\"],[9],[0,\"Distributional analysis for model predictive deferrable load control\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"Proc. of the 53rd IEEE Conference on Decision and Control\"],[10],[0,\",\\n    Los Angeles, CA, December 2014\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"we prove strong concentration results on the load variation under model predictive deferrable load control. They suggest that the typical performance is tightly concentrated around the average-case performance.\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"Supply function equilibrium can be used to design pricing mechanisms to incentivice demand response. A simple uniform-price mechanism is proposed in:\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    Yunjian Xu, Na Li, and S. H. Low.\\n    \"],[7,\"a\"],[11,\"href\",\"https://ieeexplore.ieee.org/document/7741247/\"],[11,\"target\",\"_blank\"],[9],[0,\"Demand response with capacity constrained supply function bidding\"],[10],[0,\",\\n    \"],[7,\"em\"],[9],[0,\"IEEE Trans. Power Systems\"],[10],[0,\",\\n    31(2):1377–1394, March 2016\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"p\"],[9],[0,\"that achieves approximate social optimality at a Nash equilibrium, provided the total capacity excluding the consumer\\nwith the largest capacity is much larger than the total amount of required load reduction.\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "netlab/templates/research/power-systems-steady-state.hbs"
    }
  });

  _exports.default = _default;
});
;

;define('netlab/config/environment', [], function() {
  var prefix = 'netlab';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("netlab/app")["default"].create({"name":"netlab","version":"1.0.0+91271a94"});
          }
        
//# sourceMappingURL=netlab.map
