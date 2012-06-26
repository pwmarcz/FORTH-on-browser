
// Testing

forth.assertEqual = function(e1, e2) {
    if (e1 != e2) {
        var err = 'Assertion failed: ' + e1 + ' != ' + e2;
        throw err;
    }
};

forth.assertExec = function(code, result) {
    forth.runString(code);
    forth.assertEqual(forth.stack.print(), result);
    forth.stack.reset();
};

forth.test = function() {
    forth.terminal.echo('Running tests...');
    try {
        forth.assertEqual(forth.printTokens(forth.parse(' A b c  d ')),
                          'a b c d');

        forth.assertExec('2 3', '[2, 3]');

        forth.assertExec('2 3 +', '[5]');

        forth.assertExec('5 3 0 1 + / -', '[2]');

        forth.assertExec('2 3 swap dup', '[3, 2, 2]');
        forth.assertExec('2 3 drop drop', '[]');
        forth.assertExec('1 2 3 rot', '[2, 3, 1]');
        forth.assertExec('1 2 3 -rot', '[3, 1, 2]');
        forth.assertExec('1 2 over', '[1, 2, 1]');

        forth.assertExec('true false and', '[false]');
        forth.assertExec('true false true and or not', '[false]');

        forth.assertExec('2 2 = 2 2 <= 2 2 >= 2 2 <>', '[true, true, true, false]');
        forth.assertExec('2 3 = 2 3 <= 2 3 >= 2 3 <>', '[false, true, false, true]');
        forth.assertExec('2 2 < 2 2 >', '[false, false]');
        forth.assertExec('2 3 < 2 3 >', '[true, false]');

        forth.assertExec(': a 2 2 + ;', '[]');
        forth.assertExec('a', '[4]');
        delete forth.dict['a'];

        forth.assertExec(': a true if 1 else 0 then ; a', '[1]');
        forth.assertExec(': a false if 1 else 0 then ; a', '[0]');
        delete forth.dict['a'];

        forth.assertExec(': a true if 1 then ; a', '[1]');
        forth.assertExec(': a false if 1 then ; a', '[]');
        delete forth.dict['a'];

        forth.assertExec(': a 2 repeat 2 * dup 100 > until ; a', '[128]');
        delete forth.dict['a'];

        forth.assertExec('1 2 ( + ) -', '[-1]');
        forth.assertExec(': a 1 2 ( + ) - ; a', '[-1]');
        delete forth.dict['a'];

        // recursion
        forth.assertExec(': a 1 - dup 0 > if a then ; 10 a', '[0]');
        forth.assertExec(': a 1 - dup 0 > if recurse then ; 10 a', '[0]');
        delete forth.dict['a'];

        forth.assertExec('variable x 2 x ! x @', '[2]');
        delete forth.dict['x'];
        delete forth.variables['x'];

        forth.stack.reset();
        forth.terminal.echo('All tests OK!');
    } catch (err) {
        forth.terminal.error('test: '+err);
    }
};
