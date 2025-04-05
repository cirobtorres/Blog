import { extractAnchors, addIdsToHeadings } from "../../src/utils/anchors";

describe("extractAnchors", () => {
  /*
  TESTS
  1- it extracts no anchor from a html string if content has no header to extract
  2- it extracts anchors from a html string if content has headers to extract
  3- it skips (do not capture) tags whose content nest another tag like <b> <strong> <i> <strike> <u>
  4- it extracts anchors from a html string if content has headers to extract and some of them have ids to reutilize
  5- it extracts anchors from a html string if content has headers to extract and ignore attributes if any
  */
  it("extracts no anchor from a html string if content has no header to extract (must return void[])", () => {
    const inputData =
      '<html><body><p><a href="https://google.com.br">Lorem ipsum dolor</a><p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><ol><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ol><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p><a href="https://google.com.br">Lorem ipsum dolor</a><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p><a href="https://google.com.br">Lorem ipsum dolor</a><ul><li>Lorem ipsum dolor</li><li>Lorem ipsum dolor</li><li>Lorem ipsum dolor</li></ul><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/></body></html>';
    const toTest = extractAnchors(inputData);
    const expected: void[] = [];
    expect(toTest).toEqual(expected);
  });

  it("extracts anchors from a html string with headers", () => {
    const inputData =
      '<html><body><h1>Coloque o fogo para ferver</h1><p><a href="https://google.com.br">Lorem ipsum dolor</a><p/><h2>Em seguida coloque as 4 colheres de catchup e mexa</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><ol><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ol><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><h3>Depois quando a água estiver fervendo ponhe o miojo</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><h2>Em seguida coloque o tempero e as colheres de pimenta</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><h1>Depois rale a mussarela em cima do miojo</h1><p><a href="https://google.com.br">Lorem ipsum dolor</a><h2>Bom apetite!</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p><a href="https://google.com.br">Lorem ipsum dolor</a><ul><li>Lorem ipsum dolor</li><li>Lorem ipsum dolor</li><li>Lorem ipsum dolor</li></ul><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/></body></html>';
    const toTest = extractAnchors(inputData);
    const expected = [
      {
        "coloque-o-fogo-para-ferver": "<h1>Coloque o fogo para ferver</h1>",
      },
      {
        "em-seguida-coloque-as-4-colheres-de-catchup-e-mexa":
          "<h2>Em seguida coloque as 4 colheres de catchup e mexa</h2>",
      },
      {
        "depois-quando-a-agua-estiver-fervendo-ponhe-o-miojo":
          "<h3>Depois quando a água estiver fervendo ponhe o miojo</h3>",
      },
      {
        "em-seguida-coloque-o-tempero-e-as-colheres-de-pimenta":
          "<h2>Em seguida coloque o tempero e as colheres de pimenta</h2>",
      },
      {
        "depois-rale-a-mussarela-em-cima-do-miojo":
          "<h1>Depois rale a mussarela em cima do miojo</h1>",
      },
      {
        "bom-apetite": "<h2>Bom apetite!</h2>",
      },
    ];
    expect(toTest).toEqual(expected);
  });

  it("skips (do not capture) tags whose content nest another tag like <b> <strong> <i> <strike> <u>", () => {
    const inputData =
      '<h1>Coloque o <b>fogo</b> para ferver</h1><p><a href="https://google.com.br">Lorem ipsum dolor</a><p/><h2>Em seguida coloque as 4 colheres de catchup e mexa</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><ol><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ol><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><h3><strong>Depois</strong> quando a água estiver <i>fervendo</i> ponhe o miojo</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><h2><strike>Em seguida coloque o tempero e as colheres de pimenta</strike></h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><h1>Depois rale a mussarela em cima do miojo</h1><p><a href="https://google.com.br">Lorem ipsum dolor</a><h2>Bom apetite!</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p><a href="https://google.com.br">Lorem ipsum dolor</a><ul><li>Lorem ipsum dolor</li><li>Lorem ipsum dolor</li><li>Lorem ipsum dolor</li></ul><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/>';
    const toTest = extractAnchors(inputData);
    const expected = [
      // {
      //   "coloque-o-fogo-para-ferver": "<h1>Coloque o fogo para ferver</h1>", // SKIPPED
      // },
      {
        "em-seguida-coloque-as-4-colheres-de-catchup-e-mexa":
          "<h2>Em seguida coloque as 4 colheres de catchup e mexa</h2>",
      },
      // {
      // "depois-quando-a-agua-estiver-fervendo-ponhe-o-miojo":
      // "<h3>Depois quando a água estiver fervendo ponhe o miojo</h3>", // SKIPPED
      // },
      // {
      // "em-seguida-coloque-o-tempero-e-as-colheres-de-pimenta":
      // "<h2>Em seguida coloque o tempero e as colheres de pimenta</h2>", // SKIPPED
      // },
      {
        "depois-rale-a-mussarela-em-cima-do-miojo":
          "<h1>Depois rale a mussarela em cima do miojo</h1>",
      },
      {
        "bom-apetite": "<h2>Bom apetite!</h2>",
      },
    ];
    expect(toTest).toEqual(expected);
  });

  it("extracts anchors from a html string if content has headers to extract and some of them have ids to reutilize", () => {
    const inputData =
      '<h1 id="o-rato-roeu-a-roupa-do-rei-de-roma">Coloque o fogo para ferver</h1><p><a href="https://google.com.br">Lorem ipsum dolor</a><p/><h2>Em seguida coloque as 4 colheres de catchup e mexa</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><ol><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ol><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><h3>Depois quando a água estiver fervendo ponhe o miojo</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><h2 id="tres-tigres-tristes-para-tres-pratos-de-trigo">Em seguida coloque o tempero e as colheres de pimenta</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><h1 id="o-sabia-nao-sabia-que-o-sabio-sabia-assobia">Depois rale a mussarela em cima do miojo</h1><p><a href="https://google.com.br">Lorem ipsum dolor</a><h2>Bom apetite!</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p><a href="https://google.com.br">Lorem ipsum dolor</a><ul><li>Lorem ipsum dolor</li><li>Lorem ipsum dolor</li><li>Lorem ipsum dolor</li></ul><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis excepturi possimus nesciunt earum, explicabo quae similique magni necessitatibus vitae, odio perferendis dolore sapiente voluptatibus. Quos sapiente fuga praesentium tempore.<p/>';
    const toTest = extractAnchors(inputData);
    const expected = [
      {
        "o-rato-roeu-a-roupa-do-rei-de-roma":
          "<h1>Coloque o fogo para ferver</h1>",
      },
      {
        "em-seguida-coloque-as-4-colheres-de-catchup-e-mexa":
          "<h2>Em seguida coloque as 4 colheres de catchup e mexa</h2>",
      },
      {
        "depois-quando-a-agua-estiver-fervendo-ponhe-o-miojo":
          "<h3>Depois quando a água estiver fervendo ponhe o miojo</h3>",
      },
      {
        "tres-tigres-tristes-para-tres-pratos-de-trigo":
          "<h2>Em seguida coloque o tempero e as colheres de pimenta</h2>",
      },
      {
        "o-sabia-nao-sabia-que-o-sabio-sabia-assobia":
          "<h1>Depois rale a mussarela em cima do miojo</h1>",
      },
      {
        "bom-apetite": "<h2>Bom apetite!</h2>",
      },
    ];
    expect(toTest).toEqual(expected);
  });

  it("extracts anchors from a html string if content has headers to extract and ignore attributes if any", () => {
    const inputData =
      '<h1 class="i-am-a-class" aria-current="false">Coloque o fogo para ferver</h1><h2 aria-current="false">Em seguida coloque as 4 colheres de catchup e mexa</h2><h3 style="text-transform:uppercase" aria-current="false">Depois quando a água estiver fervendo ponhe o miojo</h3><h2 class="i-am-a-class" aria-current="false">Em seguida coloque o tempero e as colheres de pimenta</h2><h1 style="text-decoration:underline" aria-current="false">Depois rale a mussarela em cima do miojo</h1><h2 aria-current="page">Bom apetite!</h2>';
    const toTest = extractAnchors(inputData);
    const expected = [
      {
        "coloque-o-fogo-para-ferver": "<h1>Coloque o fogo para ferver</h1>",
      },
      {
        "em-seguida-coloque-as-4-colheres-de-catchup-e-mexa":
          "<h2>Em seguida coloque as 4 colheres de catchup e mexa</h2>",
      },
      {
        "depois-quando-a-agua-estiver-fervendo-ponhe-o-miojo":
          "<h3>Depois quando a água estiver fervendo ponhe o miojo</h3>",
      },
      {
        "em-seguida-coloque-o-tempero-e-as-colheres-de-pimenta":
          "<h2>Em seguida coloque o tempero e as colheres de pimenta</h2>",
      },
      {
        "depois-rale-a-mussarela-em-cima-do-miojo":
          "<h1>Depois rale a mussarela em cima do miojo</h1>",
      },
      {
        "bom-apetite": "<h2>Bom apetite!</h2>",
      },
    ];
    expect(toTest).toEqual(expected);
  });
});

describe("addIdsToHeadings", () => {
  it("adds ids to header tags", () => {
    const inputData =
      "<h1>Coloque o fogo para ferver</h1><h2>Em seguida coloque as 4 colheres de catchup e mexa</h2><h3>Depois quando a água estiver fervendo ponhe o miojo</h3><h2>Em seguida coloque o tempero e as colheres de pimenta</h2><h1>Depois rale a mussarela em cima do miojo</h1><h2>Bom apetite!</h2>";
    const toTest = addIdsToHeadings(inputData);
    const expected =
      '<h1 id="coloque-o-fogo-para-ferver" tabIndex="0">Coloque o fogo para ferver</h1><h2 id="em-seguida-coloque-as-4-colheres-de-catchup-e-mexa" tabIndex="0">Em seguida coloque as 4 colheres de catchup e mexa</h2><h3 id="depois-quando-a-agua-estiver-fervendo-ponhe-o-miojo" tabIndex="0">Depois quando a água estiver fervendo ponhe o miojo</h3><h2 id="em-seguida-coloque-o-tempero-e-as-colheres-de-pimenta" tabIndex="0">Em seguida coloque o tempero e as colheres de pimenta</h2><h1 id="depois-rale-a-mussarela-em-cima-do-miojo" tabIndex="0">Depois rale a mussarela em cima do miojo</h1><h2 id="bom-apetite" tabIndex="0">Bom apetite!</h2>';
    expect(toTest).toEqual(expected);
  });
});
