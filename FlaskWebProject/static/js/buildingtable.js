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

function delete_ambassador_button(data, type, row, meta) {
    return '<div class="ambadelete"> \
        <form class="amba-delete-form" action="' + row.deleteurl + '" method="POST"> \
            <input type="hidden" id="bldng" name="bldng" value="' + row.bldng + '"> \
            <div class="text-center"> \
                <button class="btn btn-danger btn-sm amba-delete-button"> \
                    <span class="glyphicon glyphicon-trash centericon" aria-hidden="true"></span> \
                </button> \
            </div> \
        </form> \
    </div>';
}

function new_ambassador_form(data, type, row, meta) {
    return '<div class="ambanew"> \
        <form id="amba-new-form" action="' + row.newurl + '" method="POST"> \
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

function update_ambassador_form(data) {
    return '<div class="ambaupdate"> \
        <div class="alert alert-danger">Editing ' + data.Ambassador_Name + '</div> \
        <form class="amba-update-form" action="' + data.editurl + '" method="POST"> \
            <div class="form-group"> \
                <label for="Ambassador_Name">Name</label> \
                <input type="text" class="form-control" id="Ambassador_Name" name="Ambassador_Name" placeholder="Name" value="' + data.Ambassador_Name + '"> \
            </div> \
            <div class="form-group"> \
                <label for="Amb_Apartment">Apartment</label> \
                <input type="text" class="form-control" id="Amb_Apartment" name="Amb_Apartment" placeholder="Apartment" value="' + data.Amb_Apartment + '"> \
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
            <button class="btn btn-danger amba-update-button">Update</button> \
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
                { 'title': 'Likely Party', 'data': 'Likely_party' }/*,
                { 'title': 'Make an Ambassador', 'render': new_ambassador_form }*/
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
                { 'title': 'Age', 'data': 'Age' }/*,
                { 'title': 'Make Ambassador', 'render': new_ambassador_form }*/
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
                {
                    'className': 'amba-delete dt-center',
                    'orderable': false,
                    'title': 'Delete Ambassador',
                    'data': 'ambassadorID',
                    'render': delete_ambassador_button
                },
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

            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            } else {
                row.child(update_ambassador_form(row.data())).show();
                tr.addClass('shown');

                // add confirm dialog to all update buttons
                $(function() {
                    $('.amba-update-button').click(function(e) {
                        e.preventDefault();
                        if (confirm('Click OK to UPDATE user:')) {
                            $('form.amba-update-form').submit();
                        }
                    });
                });
            }
        });

        // add confirm dialog to all delete buttons
        $(function() {
            $('.amba-delete-button').click(function(e) {
                e.preventDefault();
                if (confirm('Click OK to DELETE user:')) {
                    $('form.amba-delete-form').submit();
                }
            });
        });
    });
}
