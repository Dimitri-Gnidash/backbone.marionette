describe("template cache", function(){

  describe("when loading a template for the first time", function(){
    beforeEach(function(){
      setFixtures("<script id='t1' type='template'>t1</script>");

      spyOn(Backbone.Marionette.TemplateCache, "loadTemplate").andCallThrough();

      Backbone.Marionette.TemplateCache.get("#t1");
    });
    
    it("should load from the DOM", function(){
      expect(Backbone.Marionette.TemplateCache.loadTemplate).toHaveBeenCalled();
    });
  });

  describe("when loading a template more than once", function(){
    beforeEach(function(){
      setFixtures("<script id='t2' type='template'>t2</script>");

      spyOn(Backbone.Marionette.TemplateCache, "loadTemplate").andCallThrough();

      Backbone.Marionette.TemplateCache.get("#t2");
      Backbone.Marionette.TemplateCache.get("#t2");
      Backbone.Marionette.TemplateCache.get("#t2");
    });
    
    it("should load from the DOM once", function(){
      expect(Backbone.Marionette.TemplateCache.loadTemplate.callCount).toBe(1);
    });
  });

  describe("when clearing the full template cache", function(){
    beforeEach(function(){
      setFixtures("<script id='t3' type='template'>t3</script>");
      Backbone.Marionette.TemplateCache.get("#t3");

      Backbone.Marionette.TemplateCache.clear();
    });
    
    it("should clear the cache", function(){
      expect(_.size(Backbone.Marionette.TemplateCache.templates)).toBe(0);
    });
  });

  describe("when clearing a single template from the cache", function(){
    beforeEach(function(){
      setFixtures("<script id='t4' type='template'>t4</script><script id='t5' type='template'>t5</script><script id='t6' type='template'>t6</script>");
      Backbone.Marionette.TemplateCache.get("#t4");
      Backbone.Marionette.TemplateCache.get("#t5");
      Backbone.Marionette.TemplateCache.get("#t6");

      Backbone.Marionette.TemplateCache.clear("#t4");
    });
    
    it("should clear the specified templates cache", function(){
      expect(Backbone.Marionette.TemplateCache.templates["#t4"]).toBeUndefined();
    });

    it("should not clear other templates from the cache", function(){
      expect(Backbone.Marionette.TemplateCache.templates["#t5"]).not.toBeUndefined();
      expect(Backbone.Marionette.TemplateCache.templates["#t6"]).not.toBeUndefined();
    });
  });

  describe("when clearing multiple templates from the cache", function(){
    beforeEach(function(){
      setFixtures("<script id='t4' type='template'>t4</script><script id='t5' type='template'>t5</script><script id='t6' type='template'>t6</script>");
      Backbone.Marionette.TemplateCache.get("#t4");
      Backbone.Marionette.TemplateCache.get("#t5");
      Backbone.Marionette.TemplateCache.get("#t6");

      Backbone.Marionette.TemplateCache.clear("#t4", "#t5");
    });
    
    it("should clear the specified templates cache", function(){
      expect(Backbone.Marionette.TemplateCache.templates["#t4"]).toBeUndefined();
      expect(Backbone.Marionette.TemplateCache.templates["#t5"]).toBeUndefined();
    });

    it("should not clear other templates from the cache", function(){
      expect(Backbone.Marionette.TemplateCache.templates["#t6"]).not.toBeUndefined();
    });
  });
});
