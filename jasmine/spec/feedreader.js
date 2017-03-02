/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that URL is not empty.
         */
        it('have a URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that name is not empty.
         */
        it('have a name', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             });
          });
    });


    /* This suite is all about the menu */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('changes visibility when clicked', function() {
            // Checks if the menu is visible after the first click
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Checks if the menu is hidden after the second click
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* This suite is all about the loaded content */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('have loaded', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    /* This suite is all about the new loaded content */
    describe('New Feed Selection', function() {
        var firstFeed,
            newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });

        /* This test ensures when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
        it('is loaded', function(done) {
            expect(firstFeed).not.toEqual(newFeed);
            done();
        });
    });
}());
