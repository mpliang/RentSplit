app.controller('BillCtrl', function($scope) {
	$scope.bills = [
		{
			type: 'rent',
			amount: 3500,
			due: '12/23/15',
			roomates: [
				'John',
				'Steve',
				'Ben',
			],
			notes: 'no notes',
			repeat: 'monthly',
			paid: false,
		},
		{
			type: 'internet/cable',
			amount: 200,
			due: '12/15/15',
			roomates: [
				'John',
				'Ben',
			],
			notes: 'no notes',
			repeat: 'monthly',
			paid: false,
		},
		{
			type: 'water',
			amount: 100,
			due: '12/23/15',
			roomates: [
				'John',
				'Steve',
				'Ben',
			],
			notes: 'no notes',
			repeat: 'monthly',
			paid: false,
		},
		{
			type: 'paid',
			amount: 100,
			due: '12/23/15',
			roomates: [
				'John',
				'Steve',
				'Ben',
			],
			notes: 'no notes',
			repeat: 'monthly',
			paid: false,
		},
	];

});
