/* --------------------------------------------------------------------------
 * file constants
 * -------------------------------------------------------------------------- */

var TODAY = new Date();
var YYYYMMDD = TODAY.toISOString().substring(0, 10);


/* --------------------------------------------------------------------------
 * rendering functions
 * -------------------------------------------------------------------------- */

function building_url(data, type, row, meta) {
    return "<a href='" + row.url + "'>" + data + "</a>";
}

function bs_glyph_edit(data, type, row, meta) {
    return '<span class="glyphicon glyphicon-edit centericon" aria-hidden="true"></span>';
}

function ambassador_button(data, type, row, meta) {
    return '<div class="ambanew"> \
        <form id="login" action="' + row.newurl + '" method="POST"> \
            <input type="hidden" id="Address" name="Address" value="' + row.Address + '"> \
            <input type="hidden" id="Ambassador_Name" name="Ambassador_Name" value="' + row.Name + '"> \
            <input type="hidden" id="Email" name="Email" value="' + row.Email + '"> \
            <input type="hidden" id="Phone" name="Phone" value="' + row.Phone + '"> \
            <div class="text-center"> \
                <button type="submit" class="btn btn-primary btn-sm">Ambassador</button> \
            </div> \
        </form> \
    </div>';
}

function ambassador_update_form(data) {
    return '<div class="ambaupdate"> \
        <div class="alert alert-danger">Editing ' + data.Ambassador_Name + '</div> \
        <form id="login" action="' + data.editurl + '" method="POST"> \
            <div class="form-group"> \
                <label for="Ambassador_Name">Name</label> \
                <input type="text" class="form-control" id="Ambassador_Name" name="Ambassador_Name" placeholder="Ambassador_Name" value="' + data.Ambassador_Name + '"> \
            </div> \
            <div class="form-group"> \
                <label for="Amb_Apartment">Apartment</label> \
                <input type="text" class="form-control" id="Amb_Apartment" name="Amb_Apartment" placeholder="Amb_Apartment" value="' + data.Amb_Apartment + '"> \
            </div> \
            <div class="form-group"> \
                <label for="Phone">Phone</label> \
                <input type="tel" class="form-control" id="Phone" name="Phone" placeholder="Phone" value="' + data.Phone + '"> \
            </div> \
            <div class="form-group"> \
                <label for="Email">Email</label> \
                <input type="email" class="form-control" id="Email" name="Email" placeholder="Email" value="' + data.Email + '"> \
            </div> \
            <input type="hidden" id="bldng" name="bldng" value="' + data.bldng + '"> \
            <button type="submit" class="btn btn-danger">Update</button> \
        </form> \
    </div>';
}


/* --------------------------------------------------------------------------
 * making tables
 * -------------------------------------------------------------------------- */

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
                { 'title': 'Building', 'data': 'neighborhood' },
                { 'title': 'Precinct', 'data': 'precinct' },
                { 'title': 'Unit Count', 'data': 'unitcount' },
                { 'title': 'Door Count', 'data': 'doorcount' },
                { 'title': 'Voter Count', 'data': 'votercount' },
                { 'title': 'Volunteer Count', 'data': 'volcount' }
            ],
            'order': [3, 'desc'],
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

function draw_ambassador_table(tabId, ambassadorData, building) {
    $(document).ready(function() {
        var ambassadortable = $(tabId).DataTable({
            'data': ambassadorData,
            'buttons': [
                'copy',
                { 'extend': 'csv', filename: 'mubs ambassadors ' + building + ' ' + YYYYMMDD },
                { 'extend': 'excel', filename: 'mubs ambassadors ' + building + ' ' + YYYYMMDD },
                { 'extend': 'pdf', filename: 'mubs ambassadors ' + building + ' ' + YYYYMMDD },
                'print'
            ],
            'columns': [
                {
                    'className': 'details-control dt-center',
                    'orderable': false,
                    'data': 'ambassadorID',
                    'render': bs_glyph_edit
                },
                { 'title': 'Name', 'data': 'Ambassador_Name' },
                { 'title': 'Apartment', 'data': 'Amb_Apartment' },
                { 'title': 'Phone', 'data': 'Phone' },
                { 'title': 'Email', 'data': 'Email' },
            ],
            'order': [1, 'asc'],
            'pageLength': 50
        });

        ambassadortable.buttons().container()
            .appendTo( tabId + '_wrapper .col-sm-6:eq(0)' );

        // add event listener for opening and closing details
        $(tabId + ' tbody').on('click', 'td.details-control', function() {
            var tr = $(this).closest('tr');
            var row = ambassadortable.row(tr);
            console.log(row.data());

            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            } else {
                row.child(ambassador_update_form(row.data())).show();
                tr.addClass('shown');
            }
        });
    });
}
