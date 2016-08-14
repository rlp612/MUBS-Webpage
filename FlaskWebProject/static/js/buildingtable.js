function building_url(data, type, row, meta) {
    return "<a href='" + row.url + "'" + data + "') }}'>" + data + "</a>";
}

function draw_building_table(tabId, buildingData) {
    $(document).ready(function() {
        var buildingtable = $(tabId).DataTable({
            'data': buildingData,
            'buttons': [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            'columns': [
                {
                    'title': 'Building',
                    'data': 'address',
                    'render': building_url
                },
                {
                    'title': 'Unit Count',
                    'data': 'unitcount'
                },
                {
                    'title': 'Neighborhood',
                    'data': 'neighborhood'
                }
            ],
            'order': [1, 'desc'],
            'pageLength': 50
        });

        buildingtable.buttons().container()
            .appendTo( '#scoretable_wrapper .col-sm-6:eq(0)' );
    });
}

function draw_voter_table(tabId, voterData) {
    $(document).ready(function() {
        var votertable = $(tabId).DataTable({
            'data': voterData,
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
    });
}

function draw_volunteer_table(tabId, volunteerData) {
    $(document).ready(function() {
        var volunteertable = $(tabId).DataTable({
            'data': volunteerData,
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
    });
}
