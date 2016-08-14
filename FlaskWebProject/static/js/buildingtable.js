var TODAY = new Date();
var YYYYMMDD = TODAY.toISOString().substring(0, 10);

function building_url(data, type, row, meta) {
    return "<a href='" + row.url + "'" + data + "') }}'>" + data + "</a>";
}

function draw_building_table(tabId, buildingData) {
    $(document).ready(function() {
        var buildingtable = $(tabId).DataTable({
            'data': buildingData,
            'buttons': [
                'copy',
                { 'extend': 'csv', filename: 'mubs buildings ' + YYYYMMDD },
                { 'extend': 'excel', filename: 'mubs buildings ' + YYYYMMDD },
                { 'extend': 'pdf', filename: 'mubs buildings ' + YYYYMMDD },
                'print'
            ],
            'columns': [
                {
                    'title': 'Address',
                    'data': 'address',
                    'render': building_url
                },
                {
                    'title': 'Unit Count',
                    'data': 'unitcount'
                },
                {
                    'title': 'Building',
                    'data': 'neighborhood'
                }
            ],
            'order': [1, 'desc'],
            'pageLength': 50
        });

        buildingtable.buttons().container()
            .appendTo( tabId + '_wrapper .col-sm-6:eq(0)' );
    });
}

function draw_voter_table(tabId, voterData, building) {
    $(document).ready(function() {
        var votertable = $(tabId).DataTable({
            'data': voterData,
            'buttons': [
                'copy',
                { 'extend': 'csv', filename: 'mubs voters ' + building + ' ' + YYYYMMDD },
                { 'extend': 'excel', filename: 'mubs voters ' + building + ' ' + YYYYMMDD },
                { 'extend': 'pdf', filename: 'mubs voters ' + building + ' ' + YYYYMMDD },
                'print'
            ],
            'columns': [
                { 'title': 'Name', 'data': 'Name' },
                { 'title': 'Address', 'data': 'Address' },
                { 'title': 'City', 'data': 'City' },
                { 'title': 'Phone', 'data': 'Phone' },
                { 'title': 'Email', 'data': 'Email' },
                { 'title': 'Age', 'data': 'Age' },
                { 'title': 'Likely Party', 'data': 'Likely_party' },
            ],
            'order': [1, 'asc'],
            'pageLength': 50
        });

        votertable.buttons().container()
            .appendTo( tabId + '_wrapper .col-sm-6:eq(0)' );
    });
}

function draw_volunteer_table(tabId, volunteerData, building) {
    $(document).ready(function() {
        var volunteertable = $(tabId).DataTable({
            'data': volunteerData,
            'buttons': [
                'copy',
                { 'extend': 'csv', filename: 'mubs volunteers ' + building + ' ' + YYYYMMDD },
                { 'extend': 'excel', filename: 'mubs volunteers ' + building + ' ' + YYYYMMDD },
                { 'extend': 'pdf', filename: 'mubs volunteers ' + building + ' ' + YYYYMMDD },
                'print'
            ],
            'columns': [
                { 'title': 'Name', 'data': 'Name' },
                { 'title': 'Address', 'data': 'Address' },
                { 'title': 'City', 'data': 'City' },
                { 'title': 'Phone', 'data': 'Phone' },
                { 'title': 'Email', 'data': 'Email' },
                { 'title': 'Age', 'data': 'Age' },
            ],
            'order': [1, 'asc'],
            'pageLength': 50
        });

        volunteertable.buttons().container()
            .appendTo( tabId + '_wrapper .col-sm-6:eq(0)' );
    });
}
